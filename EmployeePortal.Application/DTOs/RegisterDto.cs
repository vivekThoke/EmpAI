using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeePortal.Application.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string ?Name { get; set; }

        [Required]
        [EmailAddress]
        public string ?Email { get; set; }

        [Required]
        [MinLength(6)]
        public string ?Password { get; set; }
    }
}
