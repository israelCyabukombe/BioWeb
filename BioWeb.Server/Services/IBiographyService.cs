using BioWeb.Server.Models;
using BioWeb.Server.Dtos;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace BioWeb.Server.Services
{
    public interface IBiographyService
    {
        Task<PersonalInfo?> GetPersonalInfo(int id);
        Task<List<ProjectDto>> GetProjects();
        Task<List<Skill>> GetSkills(int personId);
    }
}
