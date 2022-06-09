using buildpathAPI.Models;

namespace buildpathAPI.Services
{
    public interface IFightService
    {
        decimal CalculateDPS(Champion attacker, Champion? defender);
        decimal CalculateTTK(Champion attacker, Champion defender);
    }

    public class FightService : IFightService
    {
        public decimal CalculateDPS(Champion attacker, Champion? defender)
        {
            return attacker.AtkSp * attacker.AD;
        }

        public decimal CalculateTTK(Champion attacker, Champion defender)
        {
            return defender.HP / CalculateDPS(attacker, defender);
        }
    }
}
