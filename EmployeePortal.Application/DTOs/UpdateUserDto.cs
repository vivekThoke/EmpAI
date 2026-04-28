using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeePortal.Application.DTOs
{
    public class UpdateUserDto
    {
        public string ?Name { get; set; }
        public string ?Department { get; set; }
        public string ?Designation { get; set; }
    }
}
