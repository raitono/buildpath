"use client"
import { useState } from "react"
import { trpc } from "../_trpc/client"
import { serverClient } from "../_trpc/serverClient"

export default function ChampionList({
  initialChampions: initialChampions,
}: {
  initialChampions: Awaited<ReturnType<typeof serverClient.getChampions>>
}) {
  const getChampions = trpc.getChampions.useQuery(undefined, {
    initialData: initialChampions,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
  const championRefetch = {
    onSettled: () => {
      getChampions.refetch()
    },
  }
  const addChampion = trpc.addChampion.useMutation(championRefetch)
  const setDone = trpc.setDone.useMutation(championRefetch)

  const [name, setName] = useState("")

  return (
    <div>
      <div className="text-black my-5 text-3xl">
        {getChampions?.data?.map((champ) => (
          <div key={champ.id} className="flex gap-3 items-center">
            <input
              id={`check-${champ.id}`}
              type="checkbox"
              checked={!!champ.done}
              style={{ zoom: 1.5 }}
              onChange={async () => {
                setDone.mutate({
                  id: champ.id,
                  done: champ.done ? 0 : 1,
                })
              }}
            />
            <label htmlFor={`check-${champ.id}`}>{champ.name}</label>
          </div>
        ))}
      </div>
      <div className="flex gap-3 items-center">
        <label htmlFor="name" className="text-black">
          Name
        </label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-grow text-black bg-white rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-4 py-2"
        />
        <button
          onClick={async () => {
            if (name.length) {
              addChampion.mutate(name)
              setName("")
            }
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded-full"
        >
          Add Champion
        </button>
      </div>
    </div>
  )
}
