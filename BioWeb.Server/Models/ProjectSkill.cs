using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BioWeb.Server.Models
{
    public class ProjectSkill
    {
        public int Id { get; set; }

        public int ProjectId { get; set; }

        public int SkillId { get; set; }

        public Project Project { get; set; } = null!;

        public Skill Skill { get; set; } = null!;

    }
}
