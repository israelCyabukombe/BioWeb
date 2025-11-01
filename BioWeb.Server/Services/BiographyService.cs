
using BioWeb.Server.Data;
using BioWeb.Server.Models;

namespace BioWeb.Server.Services
{
    public class BiographyService : IBiographyService
    {
        private readonly ApplicationDbContext _context;

        public BiographyService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<PersonalInfo?> GetPersonalInfo(int id)
        {
            var pInfo = await _context.PersonalInfos.FindAsync(id);

            return pInfo;
        }
    }
}
