using Pet.Prototype.Models;
using Pet.Prototype.Repositories;
using Pet.Prototype.Utilis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Pet.Prototype.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            var roles = MyExtensions.GetRole();
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult Cabinet()
        {
            return View();
        }

        public ActionResult Application()
        {
            return View();
        }

        public ActionResult AnnouncementsView()
        {
            return View();
        }

        public ActionResult ApplyToAnnouncement()
        {
            return View();
        }

        public ActionResult ApplyToAnnouncementView()
        {
            return View();
        }

        public ActionResult AllAnnouncements()
        {
            var model = new List<AnnouncementViewModel>();
            string ErrorMessage = new RegisterRepository().GetApplyAnnouncements(2, ref model);
            return View(model);
        }

        public ActionResult Orders(int status)
        {
            var models = new List<OrderViewModel>();
            string ErrorMessage = new RegisterRepository().GetOrders(status, ref models);
            return View(models);
        }

        [HttpGet]
        public ActionResult Announcements(int status)
        {
            var model = new List<AnnouncementViewModel>();
            string ErrorMessage = new RegisterRepository().GetAnnouncements(status, ref model);
            return View(model);
        }

        public ActionResult Employees()
        {
            var list = new List<UserViewModel>();
            string ErrorMessage = new RegisterRepository().GetEmployees(ref list);
            return View(list);
        }

        public ActionResult GetEmployeeById(string id)
        {
            UserViewModel item = new UserViewModel();
            var ErrorMessage = new RegisterRepository().GetEmployeeById(id, ref item);
            return Json(item);
        }

        public ActionResult GetCurrUserCompany()
        {
            var item = new RegisterRepository().GetCurrUserCompany();
            return Json(item);
        }

        public ActionResult EditEmployee(string id, string userposition, string email, string mobilephone, string workphone, bool isactive,string permissions)
        {
            string ErrorMessage = new RegisterRepository().EditEmployee(id, userposition, email, mobilephone, workphone, isactive,permissions);
            ItemResponse result = new ItemResponse();
            if (ErrorMessage == "")
                result.IsError = false;
            else result.IsError = true;

            result.ErrorMessage = ErrorMessage;
            return Json(result);
        }

        public ActionResult GetCurrUserCompanyBank()
        {
            var item = new RegisterRepository().GetCurrUserCompanyBank();
            return Json(item);
        }

        public ActionResult GetBanksByUserId(string uid)
        {
            var list = new RegisterRepository().GetBanksByUserId(uid);
            return Json(list);
        }

        public ActionResult PreDocSign(string datebidding, decimal startprice, decimal margin, string datedeadline, string goodsname, string composition, string lotssize, int lotscount, int? typedelivery, string datedelivery, string paymenttype)
        {
            Announcements item = new Announcements();
            var userId = MyExtensions.GetCurrentUserId().Value;
            item.SellerId = userId;
            item.DateCreate = DateTime.Now;
            item.DateBidding = Convert.ToDateTime(datebidding);
            item.StartPrice = startprice;
            item.Margin = margin;
            item.DeadlineDate = Convert.ToDateTime(datedeadline);
            item.GoodsName = goodsname;
            item.Composition = composition;
            item.LotSize = lotssize;
            item.LotCount = lotscount;
            item.TypeDelivery = typedelivery;

            if (datedelivery != "")
                item.DateDelivery = Convert.ToDateTime(datedelivery);
            item.PaymentType = paymenttype;
            item.Status = 1;

            string ErrorMessage = string.Empty;
            string preambleXml = string.Empty;
            bool IsSuccess = true;
            try
            {
                preambleXml = SerializeHelper.SerializeDataContract<Announcements>(item);
                preambleXml = preambleXml.Replace("utf-16", "utf-8");
            }
            catch (Exception e)
            {
                IsSuccess = false;
                ErrorMessage = e.Message;
            }
            return Json(new
            {
                IsSuccess,
                ErrorMessage,
                preambleXml
            });

        }

        public ActionResult SignDoc(string datebidding, decimal startprice, decimal margin, string datedeadline, string goodsname, string composition, string lotssize, int lotscount, int? typedelivery, string datedelivery, string paymenttype, string xmlAuditForm)
        {
            int docno = 0;
            var IsSuccess = true;
            string ErrorMessage = new RegisterRepository().AddAnnouncements(datebidding, startprice, margin, datedeadline, goodsname, composition, lotssize, lotscount, typedelivery, datedelivery, paymenttype, xmlAuditForm, ref docno);
            if (ErrorMessage != "")
                IsSuccess = false;

            return Json(new
            {
                docno,
                IsSuccess,
                ErrorMessage
            }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetUserCompany(string uid)
        {
            var item = new RegisterRepository().GetUserCompany(uid);
            return Json(item);
        }

        public ActionResult GetUserCompanyBank(string uid)
        {
            var item = new RegisterRepository().GetUserCompanyBank(uid);
            return Json(item);
        }

        public ActionResult GetAnnouncement(string id)
        {
            var item = new RegisterRepository().GetAnnouncement(id);
            return Json(item);
        }

        public ActionResult PerApplyDoc(string buyername, string buyerbin, string announcementid, int sellerno, decimal sellerstartprice, string sellerdeliverytype, string bankaccountid, string bankwarranty)
        {
            OrderViewModel model = new OrderViewModel();
            model.CreateDate = DateTime.Now.ToString("dd/MM/yyyy");
            model.BuyerId = MyExtensions.GetCurrentUserId().Value;
            model.BuyerBIN = buyerbin;
            model.BuyerName = buyername;
            model.AnnouncementId = new Guid(announcementid);
            model.SellerNo = sellerno;
            model.SellerStartPrice = sellerstartprice;
            model.SellerDeliveryType = sellerdeliverytype;
            var bankid = new Guid(bankaccountid);
            model.BankAccountId =bankid;
            model.BankWarranty = bankwarranty;

            string ErrorMessage = string.Empty;
            string preambleXml = string.Empty;
            bool IsSuccess = true;
            try
            {
                preambleXml = SerializeHelper.SerializeDataContract<OrderViewModel>(model);
                preambleXml = preambleXml.Replace("utf-16", "utf-8");
            }
            catch (Exception e)
            {
                IsSuccess = false;
                ErrorMessage = e.Message;
            }
            return Json(new
            {
                IsSuccess,
                ErrorMessage,
                preambleXml
            });
        }

        public ActionResult SignApplyDoc(string buyername, string buyerbin, string announcementid, int sellerno, decimal sellerstartprice, string sellerdeliverytype, string bankaccountid, string bankwarranty, string xmlAuditForm)
        {
            bool IsSuccess = true;
            var item = new OrderViewModel();
            string ErrorMessage = new RegisterRepository().AddOrder(buyername, buyerbin, announcementid, sellerno, sellerstartprice, sellerdeliverytype, bankaccountid, bankwarranty, xmlAuditForm, ref item);
            if (ErrorMessage != "")
                IsSuccess = false;

            return Json(new
            {
                IsSuccess,
                ErrorMessage,
                item
            });

        }

        public ActionResult GetOrderById(string id)
        {
            var item = new RegisterRepository().GetOrderById(id);
            return Json(item);
        }

        public ActionResult AddUserPermission(string uid,string permissions)
        {
            bool IsSuccess = true;
            string ErrorMessage = new RegisterRepository().AddUserPermission(uid,permissions);
            if (ErrorMessage != "")
                IsSuccess = false;
            return Json(new
            {
                IsSuccess,
                ErrorMessage
            });
        }


        public ActionResult GetUserPermission(string uid)
        {
            string permissions = new RegisterRepository().GetUserPermission(uid);           
            return Json(new
            {
                permissions
            });
        }

    }
}