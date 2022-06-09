using Microsoft.AspNetCore.Mvc;

namespace buildpathAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BuildPathController : ControllerBase
    {

        private readonly ILogger<BuildPathController> _logger;

        public BuildPathController(ILogger<BuildPathController> logger)
        {
            _logger = logger;
        }

        [HttpGet("{champion}", Name = "GetBuildPath")]
        public IActionResult GetFor([FromRoute] string champion)
        {
            return Ok(champion);
        }
    }
}