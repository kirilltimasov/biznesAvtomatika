using System;
using System.Linq;
using Microsoft.Extensions.DependencyInjection;
using WebApi2.Models;

namespace WebApi2
{
    public class InitData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using var context = serviceProvider.GetRequiredService<DepartmentContext>();

            if (context.Departments.Any()) return;

            context.Departments.AddRange(
                new Department
                {
                    Title = "IT department",
                },
                new Department
                {
                    Title = "Marketing",
                }
            );
            context.SaveChanges();
        }
    }
}
