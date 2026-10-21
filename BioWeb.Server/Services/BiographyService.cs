
using BioWeb.Server.Data;
using BioWeb.Server.Dtos;
using BioWeb.Server.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

namespace BioWeb.Server.Services
{
    public class BiographyService : IBiographyService
    {
        private readonly ApplicationDbContext _context;

        private readonly IMemoryCache _cache;

        public BiographyService(ApplicationDbContext context, IMemoryCache cache)
        {
            _context = context;
            _cache = cache;
        }

        public async Task<PersonalInfo?> GetPersonalInfo(int id)
        {
            var pInfo = await _context.PersonalInfos.FindAsync(id);

            return pInfo;
        }

        public async Task<List<ProjectDto>> GetProjects()
        {
            var cacheKey = "projects";

            if (!_cache.TryGetValue(cacheKey, out List<ProjectDto>? projects) || projects is null)
            {
                
                projects = await _context.Projects
                    .Include(p => p.ProjectSkills)
                    .ThenInclude(ps => ps.Skill)
                    .OrderByDescending(p => p.SortOrder)
                    .Select(p => new ProjectDto(
                        p.Id,
                        p.Title,
                        p.Description,
                        p.LiveUrl,
                        p.RepoUrl,
                        p.ProjectSkills.Select(ps => ps.Skill.SkillName).ToList()
                    ))
                    .ToListAsync();

                var cacheEntryOptions = new MemoryCacheEntryOptions()
                    .SetAbsoluteExpiration(DateTimeOffset.UtcNow.AddMonths(6));

                _cache.Set(cacheKey, projects, cacheEntryOptions);                
            }

            return projects;
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
