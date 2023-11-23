using Duende.IdentityServer.EntityFramework.Options;
using external_training.Models;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace external_training.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions)
            : base(options, operationalStoreOptions)
        {

        }

        public DbSet<Team> Teams { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<TrainingApplication> TrainingApplications { get; set; }
        public DbSet<SelectedTrainingCourse> SelectedTrainingCourses { get; set; }
        public DbSet<Comment> Comments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder
                .Entity<TrainingApplication>()
                .Property(e => e.Status)
                .HasConversion(
                    v => v.ToString(),
                    v => (ApplicationStatus)Enum.Parse(typeof(ApplicationStatus), v));
        }
    }
}