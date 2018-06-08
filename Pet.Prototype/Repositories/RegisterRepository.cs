using Pet.Prototype.Models;
using Pet.Prototype.Utilis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;

namespace Pet.Prototype.Repositories
{
    public class RegisterRepository
    {
        PetDbContext dbContext = new PetDbContext();

        

        public string AddUser(string email,string lastname, string firstname, string secondname, string iin,string password, string mobilephone, string extraphone, string workphone, string userposition, int? role,string juridicalname,string bin,string juridicaladdress,string factaddress,ref string userId)
        {
            string ErrorMessage = "";
            try
            {
             
                Guid g;
                // Create and display the value of two GUIDs.
                g = Guid.NewGuid();

                Users user = new Users();
                user.Id = g;
                user.IIN = iin;
                user.LastName = lastname;
                user.FirstName = firstname;
                user.SecondName = secondname;
                user.Email = email;
                user.EmailConfirmed = true;
                user.UserName = iin;
                user.PasswordHash = Encrypt(password);
                user.UserPosition = userposition;
                user.MobilePhone = mobilephone;
                user.WorkPhone = workphone;
                user.ExtraPhone = extraphone;
                user.IsActive = true;
                user.CreateDate = DateTime.Now;
                user.UpdateDate = DateTime.Now;
                user.IsHeadCompany = true;
                dbContext.Users.Add(user);
                dbContext.SaveChanges();

                //----
                var comp = AddCompany(user.Id, bin, juridicalname, (user.LastName + " " + user.FirstName + " " + user.SecondName), juridicaladdress, factaddress);
                var edit_user = dbContext.Users.Find(user.Id);
                edit_user.CompanyId = comp.Id;
                dbContext.SaveChanges();

                //----
                AddUserRoles(user.Id, role);
                userId = Convert.ToString(user.Id);
            }catch(Exception ex)
            {
                ErrorMessage = ex.Message;
            }

            return ErrorMessage;
        }

        public string AddExistCompanyUser(string email, string lastname, string firstname, string secondname, string iin, string password, string mobilephone, string extraphone, string workphone, string userposition, int? role, string juridicalname, string bin, ref string userId)
        {
            string ErrorMessage = "";
            try
            {
                var comp = dbContext.Companies.FirstOrDefault(x => x.BIN == bin);
                
                Guid g;
                // Create and display the value of two GUIDs.
                g = Guid.NewGuid();

                Users user = new Users();
                user.Id = g;
                user.IIN = iin;
                user.LastName = lastname;
                user.FirstName = firstname;
                user.SecondName = secondname;
                user.Email = email;
                user.EmailConfirmed = true;
                user.UserName = iin;
                user.PasswordHash = Encrypt(password);
                user.UserPosition = userposition;
                user.MobilePhone = mobilephone;
                user.WorkPhone = workphone;
                user.ExtraPhone = extraphone;
                user.IsActive = false;
                user.CreateDate = DateTime.Now;
                user.UpdateDate = DateTime.Now;
                user.CompanyId = comp.Id;
                user.IsHeadCompany = false;
                dbContext.Users.Add(user);
                dbContext.SaveChanges();
                
                userId = Convert.ToString(user.Id);
            }
            catch (Exception ex)
            {
                ErrorMessage = ex.Message;
            }

            return ErrorMessage;
        }
        
        public void AddUserRoles(Guid userid, int? role)
        {
            string rolecode = Convert.ToString(role);
            var dicrole = dbContext.DicRoles.FirstOrDefault(x => x.Code.Equals(rolecode));
            var row = new UserRoles();
            row.Id = Guid.NewGuid();
            row.RoleId = dicrole.Id;
            row.UserId = userid;
            dbContext.UserRoles.Add(row);
            dbContext.SaveChanges();
        }

        public Companies AddCompany(Guid userid, string bin, string juridicalname, string headname, string juridicaladdress, string factaddress)
        {
            Guid g;
            // Create and display the value of two GUIDs.
            g = Guid.NewGuid();

            Companies row = new Companies();
            try
            {
                row.Id = g;
                row.BIN = bin;
                row.JuridicalName = juridicalname;
                row.JuridicalAddress = juridicaladdress;
                row.FactAddress = factaddress;
                row.CompanyHeadName = headname;
                row.CreateDate = DateTime.Now;
                row.UpdateDate = DateTime.Now;
                row.UpdateUserId = userid;
                row.CreateUserId = userid;
                row.Oblast = 2;
                row.Region = 2;
                dbContext.Companies.Add(row);
                dbContext.SaveChanges();
            }catch(Exception ex)
            {
                string error = ex.Message;
            }
            return row;
        }

        public bool AddBank(string userid, string name, string bik, string iik, int? kbe, string accounttype, string opendate, string accountcurrency, string address)
        {
            var uId = new Guid(userid);
            var currUser = dbContext.Users.FirstOrDefault(x=>x.Id==uId);
            var item = new BankAccounts();
            item.Id = Guid.NewGuid();
            item.CompanyId = currUser.CompanyId.Value;
            item.CreateDate = DateTime.Now;
            item.UpdateDate = DateTime.Now;
            item.CreateUserId = currUser.Id;
            item.UpdateUserId = currUser.Id;
            item.Name = name;
            item.BIK = bik;
            item.IIK = iik;
            item.Kbe = kbe;
            item.AccountType = accounttype;
            item.OpenDate = DateTime.Parse(opendate);
            item.AccountCurrency = accountcurrency;
            item.Address = address;
            dbContext.BankAccounts.Add(item);
            dbContext.SaveChanges();
            return true;
        }

        public bool CheckLogin(string iin, string password)
        {
            bool flag = false;
            string pwd = Encrypt(password);
            var user = dbContext.Users.FirstOrDefault(x => x.IIN == iin && x.PasswordHash == pwd);
            if (user != null)
            {
                HttpContext.Current.Session.Add(CodeConstManager.SESSION_USER, user);
                flag = true;
            }
            return flag;
        }

        public string Encrypt(string input)
        {
            const string salt = "My_$@lt_v@1Ue";
            const int iteration = 3000;
            const int bytes = 32;
            var rfc2898 = new Rfc2898DeriveBytes(input, Encoding.UTF8.GetBytes(salt), iteration);
            string myEncryptedKey = Convert.ToBase64String(rfc2898.GetBytes(bytes));
            return myEncryptedKey;
        }

        public string GetEmployees(ref List<UserViewModel> list)
        {
            string ErrorMessage = "";
            try
            {
                Guid? compId = MyExtensions.GetCurrentUserCompanyId();
                var rows = dbContext.Users.Where(x => x.CompanyId == compId && x.IsHeadCompany==false).Select(x => new UserViewModel()
                {
                    Id =x.Id,
                    LastName = x.LastName,
                    FirstName = x.FirstName,
                    SecondName = x.SecondName,
                    Email = x.Email,
                    IIN = x.IIN,
                    MobilePhone = x.MobilePhone,
                    WorkPhone = x.WorkPhone,
                    UserPosition = x.UserPosition,
                    StatusName= (x.IsActive.Value==true)?"Активный":"Не активный",
                    IsActive=x.IsActive
                }).ToList();
                if (rows != null && rows.Count > 0)
                {
                    list = rows;
                }
            }
            catch (Exception ex)
            {
                ErrorMessage = ex.Message;
            }
            return ErrorMessage;
        }

        public string GetEmployeeById(string id, ref UserViewModel item)
        {
            string ErrorMessage = "";
            try
            {
                Guid userid = new Guid(id);
                var row = dbContext.Users.FirstOrDefault(x => x.Id == userid);
                if (row != null)
                {
                    item.Id = row.Id;
                    item.IIN = row.IIN;
                    item.LastName = row.LastName;
                    item.FirstName = row.FirstName;
                    item.SecondName = row.SecondName;
                    item.Email = row.Email;
                    item.MobilePhone = row.MobilePhone;
                    item.WorkPhone = row.WorkPhone;
                    item.ExtraPhone = row.ExtraPhone;
                    item.CompanyId = row.CompanyId;
                    item.UserPosition = row.UserPosition;
                    item.IsActive = row.IsActive;
                    item.StatusName = (row.IsActive.Value == true) ? "Активный" : "Не активный";
                }
            }
            catch (Exception ex)
            {
                ErrorMessage = ex.Message;
            }

            return ErrorMessage;
        }

        public bool CheckUser(string iin)
        {
            var row = dbContext.Users.FirstOrDefault(x => x.IIN == iin);
            if (row == null)
                return false;

            return true;
        }

        public bool CheckCompany(string bin)
        {
            var row = dbContext.Companies.FirstOrDefault(x => x.BIN == bin);
            if (row == null)
                return false;

            return true;
        }

        public CompanyViewModel GetCompanyByBin(string bin)
        {
            var row = dbContext.Companies.FirstOrDefault(x => x.BIN == bin);
            if (row != null)
            {
                var item = new CompanyViewModel();
                item.Id = row.Id;
                item.BIN = row.BIN;
                item.CompanyHeadName = row.CompanyHeadName;
                item.JuridicalName = row.JuridicalName;
                item.JuridicalAddress = row.JuridicalAddress;
                item.FactAddress = row.FactAddress;

                var user = dbContext.Users.FirstOrDefault(x => x.CompanyId == item.Id);
                item.RoleCode = Convert.ToInt32(user.UserRoles.FirstOrDefault().DicRoles.Code);

                return item;
            }

            return null;
        }

        public string EditEmployee(string id, string userposition, string email, string mobilephone, string workphone, bool isactive,string permissions)
        {
            string ErrorMessage = "";
            try
            {
                var uid = new Guid(id);
                var row = dbContext.Users.FirstOrDefault(x => x.Id == uid);
                row.Email = email;
                row.WorkPhone = workphone;
                row.MobilePhone = mobilephone;
                row.UserPosition = userposition;
                row.IsActive = isactive;
                dbContext.SaveChanges();

                if (permissions != "")
                    AddUserPermission(id, permissions);

            }catch(Exception ex)
            {
                ErrorMessage = ex.Message;
            }

            return ErrorMessage;
        }

        public string AddAnnouncements(string datebidding, decimal startprice, decimal margin, string datedeadline, string goodsname, string composition, string lotssize, int lotscount, int? typedelivery, string datedelivery, string paymenttype, string xmlAuditForm,ref int no)
        {
            string ErrorMessage = "";
            try
            {
                Guid userid = MyExtensions.GetCurrentUserId().Value;
                Announcements item = new Announcements();
                item.Id= Guid.NewGuid();
                item.DateCreate = DateTime.Now;
                item.DateUpdate = DateTime.Now;
                item.SellerId = userid;
                item.DateBidding = Convert.ToDateTime(datebidding);
                item.StartPrice = startprice;
                item.Margin = margin;
                item.DeadlineDate = Convert.ToDateTime(datedeadline);
                item.GoodsName = goodsname;
                item.Composition = composition;
                item.LotSize = lotssize;
                item.LotCount = lotscount;
                item.TypeDelivery = typedelivery;
                if (!string.IsNullOrWhiteSpace(datedelivery))
                    item.DateDelivery = Convert.ToDateTime(datedelivery);
                item.PaymentType = paymenttype;
                item.XmlSign2 = xmlAuditForm;
                item.Status = 1;
                dbContext.Announcements.Add(item);
                dbContext.SaveChanges();
                no = item.No;
            }
            catch(Exception ex)
            {
                ErrorMessage = ex.Message;
            }
            return ErrorMessage;
        }

        public CompanyViewModel GetCurrUserCompany()
        {
            if (MyExtensions.GetCurrentUserCompanyId() == null)
                return null;

            var compid = MyExtensions.GetCurrentUserCompanyId().Value;
            var row = dbContext.Companies.FirstOrDefault(x => x.Id == compid);
            if (row != null)
            {
                var item = new CompanyViewModel();
                item.Id = row.Id;
                item.BIN = row.BIN;
                item.CompanyHeadName = row.CompanyHeadName;
                item.JuridicalName = row.JuridicalName;
                item.JuridicalAddress = row.JuridicalAddress;
                item.FactAddress = row.FactAddress;

                var user = dbContext.Users.FirstOrDefault(x => x.CompanyId == item.Id);
                item.RoleCode = Convert.ToInt32(user.UserRoles.FirstOrDefault().DicRoles.Code);

                return item;
            }
            return null;
        }

        public CompanyViewModel GetUserCompany(string uid)
        {
            var userId = new Guid(uid);
            var user = dbContext.Users.FirstOrDefault(x => x.Id == userId);
            if (user == null)
                return null;

            var row = dbContext.Companies.FirstOrDefault(x => x.Id == user.CompanyId);
            if (row != null)
            {
                var item = new CompanyViewModel();
                item.Id = row.Id;
                item.BIN = row.BIN;
                item.CompanyHeadName = row.CompanyHeadName;
                item.JuridicalName = row.JuridicalName;
                item.JuridicalAddress = row.JuridicalAddress;
                item.FactAddress = row.FactAddress;
                
                item.RoleCode = Convert.ToInt32(user.UserRoles.FirstOrDefault().DicRoles.Code);

                return item;
            }
            return null;
        }

        public BankViewModel GetCurrUserCompanyBank()
        {
            if (MyExtensions.GetCurrentUserCompanyId() == null)
                return null;

            var compid = MyExtensions.GetCurrentUserCompanyId().Value;
            var row = dbContext.BankAccounts.FirstOrDefault(x => x.CompanyId == compid);
            if (row != null)
            {
                var item = new BankViewModel();
                item.Id = row.Id;
                item.CompanyId = row.CompanyId;
                item.Name = row.Name;
                item.BIK = row.BIK;
                item.IIK = row.IIK;
                item.Kbe = row.Kbe;
                item.AccountType = row.AccountType;
                item.OpenDate = row.OpenDate.Value.ToString("dd/MM/yyyy");
                item.AccountCurrency = row.AccountCurrency;
                item.Address = row.Address;
                return item;
            }
            return null;
        }

        public BankViewModel GetUserCompanyBank(string uid)
        {
            if (uid == null)
                return null;

            var userId = new Guid(uid);
            var user = dbContext.Users.FirstOrDefault(x => x.Id == userId);
            if (user == null)
                return null;

            var compid = user.CompanyId.Value;
            var row = dbContext.BankAccounts.FirstOrDefault(x => x.CompanyId == compid);
            if (row != null)
            {
                var item = new BankViewModel();
                item.Id = row.Id;
                item.CompanyId = row.CompanyId;
                item.Name = row.Name;
                item.BIK = row.BIK;
                item.IIK = row.IIK;
                item.Kbe = row.Kbe;
                item.AccountType = row.AccountType;
                item.OpenDate = row.OpenDate.Value.ToString("dd/MM/yyyy");
                item.AccountCurrency = row.AccountCurrency;
                item.Address = row.Address;
                return item;
            }
            return null;
        }

        public List<BankViewModel> GetBanksByUserId(string uid)
        {
            List<BankViewModel> list = new List<BankViewModel>();

            if (uid == null)
                return null;

            var userId = new Guid(uid);
            var user = dbContext.Users.FirstOrDefault(x => x.Id == userId);
            if (user == null)
                return null;

            var compid = user.CompanyId.Value;
            var rows = dbContext.BankAccounts.Where(x => x.CompanyId == compid);
            foreach (var row in rows)
            {
                var item = new BankViewModel();
                item.Id = row.Id;
                item.CompanyId = row.CompanyId;
                item.Name = row.Name;
                item.BIK = row.BIK;
                item.IIK = row.IIK;
                item.Kbe = row.Kbe;
                item.AccountType = row.AccountType;
                item.OpenDate = row.OpenDate.Value.ToString("dd/MM/yyyy");
                item.AccountCurrency = row.AccountCurrency;
                item.Address = row.Address;
                list.Add(item);
            }
            return list;
        }
        //На подтверждении
        public string GetAnnouncements(int status,ref List<AnnouncementViewModel> list)
        {
            string ErrorMessage = "";
            try
            {
                if (MyExtensions.GetCurrentUserId() == null)
                    return null;

                var uid = MyExtensions.GetCurrentUserId().Value;
                var rows = dbContext.Announcements.Where(x => x.SellerId == uid && x.Status == status).ToList();
                foreach (var x in rows)
                {
                    var item = new AnnouncementViewModel();
                    item.Id = x.Id;
                    item.SellerId = x.SellerId;
                    item.DateBidding = x.DateBidding.Value.ToString("dd/MM/yyyy");
                    item.StartPrice = x.StartPrice;
                    item.Margin = x.Margin;
                    item.DeadlineDate = x.DeadlineDate.Value.ToString("dd/MM/yyyy");
                    item.GoodsName = x.GoodsName;
                    item.Composition = x.Composition;
                    item.LotSize = x.LotSize;
                    item.LotCount = x.LotCount;
                    item.TypeDelivery = x.TypeDelivery;
                    item.DateDelivery = x.DateDelivery.Value.ToString("dd/MM/yyyy");
                    item.PaymentType = x.PaymentType;
                    item.Status = x.Status;
                    item.StatusName = (x.Status == 1) ? "На подтверждении" : "Прием заявок";
                    item.No = x.No;

                    list.Add(item);
                }

            }
            catch(Exception ex)
            {
                ErrorMessage = ex.Message;
            }
            return ErrorMessage;
        }
                
        public string GetApplyAnnouncements(int status, ref List<AnnouncementViewModel> list)
        {
            string ErrorMessage = "";
            try
            {
                var rows = dbContext.Announcements.Where(x => x.Status == status).ToList();
                foreach (var x in rows)
                {
                    var item = new AnnouncementViewModel();
                    item.Id = x.Id;
                    item.SellerId = x.SellerId;
                    item.DateBidding = x.DateBidding.Value.ToString("dd/MM/yyyy");
                    item.StartPrice = x.StartPrice;
                    item.Margin = x.Margin;
                    item.DeadlineDate = x.DeadlineDate.Value.ToString("dd/MM/yyyy");
                    item.GoodsName = x.GoodsName;
                    item.Composition = x.Composition;
                    item.LotSize = x.LotSize;
                    item.LotCount = x.LotCount;
                    item.TypeDelivery = x.TypeDelivery;
                    item.DateDelivery = x.DateDelivery.Value.ToString("dd/MM/yyyy");
                    item.PaymentType = x.PaymentType;
                    item.Status = x.Status;
                    item.StatusName = (x.Status == 1) ? "На подтверждении" : "Прием заявок";
                    item.No = x.No;

                    list.Add(item);
                }

            }
            catch (Exception ex)
            {
                ErrorMessage = ex.Message;
            }
            return ErrorMessage;
        }

        public AnnouncementViewModel GetAnnouncement(string id)
        {
            AnnouncementViewModel item = new AnnouncementViewModel();
            if (id == null)
                return item;

            var aid = new Guid(id);
            var row = dbContext.Announcements.FirstOrDefault(x => x.Id == aid);
            if (row != null)
            {
                item.Id = row.Id;
                item.SellerId = row.SellerId;
                item.DateBidding = row.DateBidding.Value.ToString("dd/MM/yyyy");
                item.StartPrice = row.StartPrice;
                item.Margin = row.Margin;
                item.DeadlineDate = row.DeadlineDate.Value.ToString("dd/MM/yyyy");
                item.GoodsName = row.GoodsName;
                item.Composition = row.Composition;
                item.LotSize = row.LotSize;
                item.LotCount = row.LotCount;
                item.TypeDelivery = row.TypeDelivery;
                item.DateDelivery = row.DateDelivery.Value.ToString("dd/MM/yyyy");
                item.PaymentType = row.PaymentType;
                item.Status = row.Status;
                item.StatusName = (row.Status == 1) ? "На подтверждении" : "Прием заявок";
                item.No = row.No;
            }

            return item;
        }

        public string AddOrder(string buyername, string buyerbin, string announcementid, int sellerno, decimal sellerstartprice, string sellerdeliverytype,string bankaccountid,string bankwarranty, string xmlAuditForm,ref OrderViewModel item)
        {
            string ErrorMessage = "";
            try
            {
                if (MyExtensions.GetCurrentUserId() == null)
                    return null;

                var buyerId = MyExtensions.GetCurrentUserId().Value;

                var row = new Orders();
                row.Id = Guid.NewGuid();
                row.CreateDate = DateTime.Now;
                row.UpdateDate = DateTime.Now;
                var aid = new Guid(announcementid);
                row.AnnouncementId = aid;
                row.BuyerId = buyerId;
                var bankid = new Guid(bankaccountid);
                row.BankAccountId = bankid;
                row.BankWarranty = bankwarranty.Trim();
                Random rnd = new Random();
                row.No = "0123"+rnd.Next(1000);
                row.Status = 1;
                row.XmlSign = xmlAuditForm;
                dbContext.Orders.Add(row);
                dbContext.SaveChanges();

                item = GetOrderById(Convert.ToString(row.Id));

            }
            catch(Exception ex)
            {
                ErrorMessage = ex.Message;
            }

            return ErrorMessage;
        }

        public OrderViewModel GetOrderById(string id)
        {
            var item = new OrderViewModel();
            var oid = new Guid(id);
            var row = dbContext.Orders.FirstOrDefault(x => x.Id == oid);
            if (row != null)
            {
                item.Id = row.Id;
                item.CreateDate = row.CreateDate.ToString("dd/MM/yyyy");
                item.Status = row.Status;
                item.StatusName = (row.Status == 1) ? "Отправлен на рассмотрение" : "";
                item.No = row.No;
                //----
                var compId = MyExtensions.GetCurrentUserCompanyId().Value;
                var buyer = dbContext.Companies.FirstOrDefault(x => x.Id == compId);
                item.BuyerBIN = buyer.BIN;
                item.BuyerName = buyer.JuridicalName;
                item.BuyerId = row.BuyerId;

                //----
                var announ = dbContext.Announcements.FirstOrDefault(x => x.Id == row.AnnouncementId);
                item.SellerNo = announ.No;
                item.SellerStartPrice = announ.StartPrice;
                item.SellerDeliveryType = (announ.TypeDelivery == 1) ? "Авто" : "ЖД";

            }
            return item;
        }

        public string GetOrders(int status, ref List<OrderViewModel> list)
        {
            string ErrorMessage = "";
            try
            {
                if (MyExtensions.GetCurrentUserId() == null)
                    return null;

                var id = MyExtensions.GetCurrentUserId().Value;
                string query = @"select o.Id, CONVERT(VARCHAR,o.CreateDate, 120) as CreateDate, o.AnnouncementId,o.BankAccountId,case when  o.Status=1 then 'На рассмотрении' when o.Status=2 then 'Принятые заявки' end as StatusName, o.No, o.BankWarranty,o.BuyerId ,  c.BIN as BuyerBIN, c.JuridicalName as BuyerName , a.No SellerNo , a.StartPrice as SellerStartPrice , case when a.TypeDelivery=1 then 'Авто' when a.TypeDelivery=2 then 'ЖД' end as  SellerDeliveryType 
                                                                from Orders o, Users u, Companies c, Announcements a where o.BuyerId = u.Id and o.AnnouncementId = a.Id and u.CompanyId = c.Id and o.Status="+status+" and o.BuyerId='"+id.ToString().ToUpper()+"'";

                var rows = dbContext.Database.SqlQuery<OrderViewModel>(query).ToList();
                if (rows.Count > 0)
                {
                    list = rows;
                }
            }
            catch (Exception ex)
            {
                ErrorMessage = ex.Message;
            }

            return ErrorMessage;
        }

        public string AddUserPermission(string uid, string permissions)
        {
            string ErrorMessage = "";
            try
            {
                var userid = new Guid(uid);
                var item = new UserPermissions();
                item.UserId = userid;
                item.Permissions = permissions;
                dbContext.UserPermissions.Add(item);
                dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                ErrorMessage = ex.Message;
            }

            return ErrorMessage;
        }

        public string GetUserPermission(string uid)
        {
            string result = "";
            var userid = new Guid(uid);
            var row = dbContext.UserPermissions.FirstOrDefault(x => x.UserId == userid);
            if (row != null)
            {
                result = row.Permissions;
            }

            return result;
        }
    }
}