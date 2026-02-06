
using BioWeb.Server.Data;
using BioWeb.Server.Models;
using Microsoft.EntityFrameworkCore;

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

        async Task<List<Skill>> IBiographyService.GetSkills(int personId)
        {
            //string personId = personId > 0 ? personId : 1;

            var skills = await _context.Skills
                .Include(s => s.SkillLevel)
                .Where(s => s.PersonalInfoId == personId)
                .ToListAsync();

            return skills ?? new List<Skill>();
        }
    }
}
