using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;

namespace hair_hamony.API.Controllers
{
    [ApiController]
    [ApiVersion("1.0")]
    [Route("/api/v{version:apiVersion}/[controller]s")]
    public class BaseApiController : ControllerBase
    {
    }
}
