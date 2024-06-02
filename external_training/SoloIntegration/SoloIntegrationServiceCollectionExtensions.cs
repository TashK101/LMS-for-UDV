using Demands;
using Demands.Contracts;
using external_training.Repositories;
using Microsoft.Extensions.Options;
using OrgStructure;

namespace external_training.SoloIntegration
{
    public static class SoloIntegrationServiceCollectionExtensions
    {
        public static IServiceCollection AddSoloIntegration(this IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<SoloIntegrationOptions>(configuration.GetSection("SoloIntegration"));

            services.AddSingleton(provider =>
            {
                var options = provider.GetRequiredService<IOptions<SoloIntegrationOptions>>().Value;
                return UsscDemandsApi.Build(x =>
                    x.ConnectToHost(options.Host)
                        .SetApplicationToken(options.ApplicationToken)
                        .UseHttpClient());
            });

            services.AddSingleton(provider =>
            {
                var options = provider.GetRequiredService<IOptions<SoloIntegrationOptions>>().Value;
                OrgStructureApi.Start(x => x.LoadFromFile(options.OrganizationFilePath)).Wait();
                return OrgStructureApi.GetOrganization();
            });

            services.AddScoped(provider => provider.GetRequiredService<IDemandsApiClient>().GetContext());

            services.AddScoped<OrgStructureRepository>();
            services.AddScoped<ApplicationRepository>();

            return services;
        }
    }
}
