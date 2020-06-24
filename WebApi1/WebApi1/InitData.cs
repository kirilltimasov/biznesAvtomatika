using System;
using System.Linq;
using Microsoft.Extensions.DependencyInjection;
using WebApi1.Models;

namespace WebApi1
{
    public class InitData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using var context = serviceProvider.GetRequiredService<UserContext>();

            if (context.Users.Any()) return;

            context.Users.AddRange(
                new User
                {
                    UserName = "johnny81",
                    DepartmentId = 1
                },
                new User
                {
                    UserName = "missmary",
                    DepartmentId = 2
                },
                new User
                {
                    UserName = "jijames",
                    DepartmentId = 1
                }
            );
            context.SaveChanges();
        }
    }
}
