using buildpathAPI.Models;
using buildpathAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace buildpathAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BuildPathController : ControllerBase
    {

        private readonly ILogger<BuildPathController> _logger;
        private readonly IFightService _fightService;

        public BuildPathController(ILogger<BuildPathController> logger, IFightService fightService)
        {
            _logger = logger;
            _fightService = fightService;
        }

        [HttpGet("{champion}", Name = "GetBuildPathForChampion")]
        public IActionResult GetFor([FromRoute] string champion)
        {
            return Ok(champion);
        }

        [HttpPost("ttk", Name = "TTK")]
        public IActionResult TTK([FromBody] Fighters fighters)
        {
            if (fighters.defender == null) return BadRequest("Defender is required");

            return Ok(_fightService.CalculateTTK(fighters.attacker, fighters.defender));
        }

        [HttpPost("dps", Name = "DPS")]
        public IActionResult DPS([FromBody] Fighters fighters)
        {
            return Ok(_fightService.CalculateDPS(fighters.attacker, fighters.defender));
        }
    }
}