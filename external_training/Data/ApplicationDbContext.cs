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

        public DbSet<TrainingApplication> TrainingApplications { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<ApprovingManager> ApprovingManagers { get; set; }
        public DbSet<ApplicationParticipant> ApplicationParticipants { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<TrainingApplication>()
                .HasOne(t => t.Course)
                .WithOne(c => c.TrainingApplication)
                .HasForeignKey<Course>(c => c.TrainingApplicationId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder
                .Entity<TrainingApplication>()
                .Property(e => e.Status)
                .HasConversion(
                    v => v.ToString(),
                    v => (ApplicationStatus)Enum.Parse(typeof(ApplicationStatus), v));
        }
    }
}