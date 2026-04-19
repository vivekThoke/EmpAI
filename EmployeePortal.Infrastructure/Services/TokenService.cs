using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EmployeePortal.Application;
using EmployeePortal.Application.Interfaces;
using Microsoft.Extensions.Configuration;


namespace EmployeePortal.Infrastructure.Services
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _configuration;

        public TokenService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
    }
}
