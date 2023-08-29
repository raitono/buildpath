import { serverClient } from "./_trpc/serverClient"
import ChampionList from "./_components/ChampionList"

export default async function Home() {
  const champions = await serverClient.getChampions()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ChampionList initialChampions={champions} />
    </main>
  )
}
