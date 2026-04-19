using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EmployeePortal.Domain.Entities;

namespace EmployeePortal.Application.Interfaces
{
    internal interface ITokenService
    {
        string GenerateToken(User user);
    }
}
