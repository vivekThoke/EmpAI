using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeePortal.Domain.Entities
{
    public class User
    {
        public Guid Id { get; set; }
        public string ?Name { get; set; }
        public string ?Email { get; set;  }
        public string ?PasswordHash { get; set; }
        public string ?Role { get; set; }

        // New Fields 
        public string ?Department { get; set; }
        public string ?Designation { get; set }
        public DateTime CreatedAt { get; set; }
    }
}
