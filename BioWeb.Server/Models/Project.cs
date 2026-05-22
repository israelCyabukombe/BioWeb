using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BioWeb.Server.Models
{
    public class Project
    {
        public int Id { get; set; }        
        [MaxLength(25)]
        public string Title { get; set; } = string.Empty;
        [MaxLength(1000)]
        public string Description { get; set; } = string.Empty;
        [MaxLength(500)]
        public string? LiveUrl { get; set; }
        [MaxLength(500)]
        public string? RepoUrl { get; set; }
        public int SortOrder { get; set; } = 0;
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
        public DateTime? UpdateDate { get; set; }
        public ICollection<ProjectSkill> ProjectSkills { get; set; } = new List<ProjectSkill>();

    }
}
