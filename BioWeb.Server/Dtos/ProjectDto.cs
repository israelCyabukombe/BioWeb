using Microsoft.OpenApi.Any;

namespace BioWeb.Server.Dtos
{    public record ProjectDto(
        int Id,
        string Title,
        string Description,
        string? LiveUrl,
        string? RepoUrl,
        List<string> Skills
    );
}
