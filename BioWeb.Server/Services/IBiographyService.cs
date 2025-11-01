using BioWeb.Server.Models;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace BioWeb.Server.Services
{
    public interface IBiographyService
    {
        Task<PersonalInfo?> GetPersonalInfo(int id);
    }
}
