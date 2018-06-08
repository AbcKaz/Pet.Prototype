using Pet.Prototype.Models;
using Pet.Prototype.Utilis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Pet.Prototype
{
    public static class MyExtensions
    {
        public static string GetCurrentUserApplicationName()
        {
          
            var user = (Users)HttpContext.Current.Session[CodeConstManager.SESSION_USER];
            if (user == null)
            {
                return null;
            }
            string fullname = user.LastName + " " + user.FirstName;
            if (!string.IsNullOrWhiteSpace(user.SecondName))
            {
                fullname += " " + user.SecondName;
            }
            return fullname;
        }

        public static Guid? GetCurrentUserId()
        {

            var user = (Users)HttpContext.Current.Session[CodeConstManager.SESSION_USER];
            if (user == null)
            {
                return null;
            }

            return user.Id;
        }

        public static Guid? GetCurrentUserCompanyId()
        {

            var user = (Users)HttpContext.Current.Session[CodeConstManager.SESSION_USER];
            if (user == null)
            {
                return null;
            }
            
            return user.CompanyId;
        }

        public static string GetRole()
        {
            var user = (Users)HttpContext.Current.Session[CodeConstManager.SESSION_USER];
            if (user == null)
            {
                return null;
            }

            var rows = user.UserRoles.Select(x => new { x.DicRoles.Code }).ToList();
            string rolecode = rows[0].Code;
            return rolecode;
        }
    }

}