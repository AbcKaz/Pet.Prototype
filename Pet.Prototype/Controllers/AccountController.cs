
using KalkanCryptNET;
using Pet.Prototype.Models;
using Pet.Prototype.Repositories;
using Pet.Prototype.Utilis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Web;
using System.Web.Mvc;

namespace Pet.Prototype.Controllers
{
    public class AccountController : Controller
    {
      
        // GET: Account
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Register()
        {
            return View();
        }

        public ActionResult Register2()
        {
            return View();
        }

        public ActionResult Login()
        {
            return View();
        }

        public JsonResult LoginEnter(string iin, string password)
        {
            ItemResponse result = new ItemResponse();
            if (new RegisterRepository().CheckLogin(iin, password))
            {
                result.IsError = false;
            }
            else result.IsError = true;

            return Json(result);
        }

        //public JsonResult LoginCertificate(string UserName, string Password, string Certificate)
       
        public JsonResult LoginCertificate(LoginViewModel model)
        {
            ItemResponse result = new ItemResponse();
            string error = "";
            if (CertificateAuthentication(model.Certificate, out error))
            {
                if (new RegisterRepository().CheckLogin(model.UserName, model.Password))
                {
                    result.IsError = false;
                    result.ErrorMessage = "";
                }
                else
                {
                    result.IsError = true;
                    result.ErrorMessage = "Логин или пароль не корректный";
                }
            }
            else
            {
                result.IsError = true;
                result.ErrorMessage = error;
            }

            return Json(result);
        }

        private bool CertificateAuthentication(string certificate, out string error)
        {
            IKalkanCryptCOM _cryptCom = null;
            bool isSucccess = true;
            error = string.Empty;
            try
            {
                var xmlLogin = certificate;
             

               _cryptCom = new KalkanCryptCOM();
                _cryptCom.Init();

                string certificateBase64;
                _cryptCom.GetCertFromXML(xmlLogin, 0, out certificateBase64);
                
                if (!string.IsNullOrEmpty(certificateBase64))
                {
                    X509Certificate x509Cert = new X509Certificate(Convert.FromBase64String(certificateBase64));
                    //,model.Password, X509KeyStorageFlags.PersistKeySet);
                    X509Certificate2 x509Cert2 = new X509Certificate2(x509Cert);
                    bool isVerify = x509Cert2.Verify();
               
                    if (isVerify)
                    {
                        // [TODO] Make Didgital dignature Verify
                        // var verifyXml =  VerifyXml(x509Cert2, xmlLogin);

                        isSucccess = true;
                    }
                    else
                    {
                        isSucccess = false;
                        error = "Ошибка аутентификации по сертификату!";
                    }

                    isSucccess = true;
                }
            }
            catch (Exception e)
            {
                error = string.Format("Ошибка аутентификации по сертификату: {0}", e);                
                isSucccess = false;
            }
            return isSucccess;
        }        

        public ActionResult CheckUser(string iin)
        {
            var IsExist = new RegisterRepository().CheckUser(iin);
            return Json(new
            {
                IsExist
            });
        }

        public JsonResult CheckCompany(string bin)
        {       
            if (new RegisterRepository().CheckCompany(bin))
            {
                var item = new RegisterRepository().GetCompanyByBin(bin);
                item.IsExist = true;
                return Json(item);
            }

            CompanyViewModel item2 = new CompanyViewModel();
            item2.IsExist = false;
            return Json(item2);
        }

        [AllowAnonymous]
        public JsonResult SaveRegister(string email,string lastname,string firstname,string secondname,string iin, string password, string mobilephone,string extraphone, string workphone,string userposition ,int? role, string juridicalname, string bin, string juridicaladdress, string factaddress)
        {
            string userId = "-1";
            var item = new RegisterRepository().AddUser(email,lastname,firstname,secondname,iin,password,mobilephone,extraphone,workphone,userposition,role,juridicalname,bin,juridicaladdress,factaddress,ref userId);
           
            ItemResponse result = new ItemResponse();
            result.IsError = false;
            result.ErrorMessage = "";
            result.Id = userId;
            return Json(result);
        }

        [AllowAnonymous]
        public JsonResult SaveExistCompanyUser(string email, string lastname, string firstname, string secondname, string iin, string password, string mobilephone, string extraphone, string workphone, string userposition, int? role, string juridicalname, string bin)
        {
            string userId = "-1";
            var item = new RegisterRepository().AddExistCompanyUser(email, lastname, firstname, secondname, iin, password, mobilephone, extraphone, workphone, userposition, role, juridicalname, bin, ref userId);

            ItemResponse result = new ItemResponse();
            result.IsError = false;
            result.ErrorMessage = "";
            result.Id = userId;
            return Json(result);
        }


        [AllowAnonymous]
        public JsonResult SaveBank(string userid, string name, string bik, string iik, int? kbe, string accounttype, string opendate, string accountcurrency, string address)
        {
            var item = new RegisterRepository().AddBank(userid, name, bik, iik, kbe, accounttype, opendate, accountcurrency, address);

            ItemResponse result = new ItemResponse();
            result.IsError = false;
            result.ErrorMessage = "";
            return Json(result);
        }

        [AllowAnonymous]
        public ActionResult LogOff()
        {
            HttpContext.Session[CodeConstManager.SESSION_USER] = null;

            return RedirectToAction("Index", "Home");
        }
    }
}