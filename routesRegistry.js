/**
 * All the routes of gleaning node server is registered in this module.
 *
 * @author Santosh Mandal
 */
var usersAPI                  = require('./routes/users');
var clientsAPI                = require('./routes/clients');
var userClickAPI              = require('./routes/userclicks');
var userConversionAPI         = require('./routes/userconversions');
var userprofileAPI            = require('./routes/userprofile');
var redirectpartner           = require('./routes/redirectpartner');
var internalAPI               = require('./routes/internal');
var internalCampaignAPI       = require('./routes/internalcampaign');
var payoutAPI                 = require('./routes/payout');
var loginrolesDBService       = require('./dbservices/loginRolesDbService');
var merchants                 = require('./routes/merchants');
var smsAPI                    = require('./routes/sms');
var emailAPI                  = require('./routes/email');
var utilAPI                   = require('./routes/util');
var onBoardingAPI             = require('./routes/onboarding');
var extension                 = require('./routes/extension');
var loyality                  = require('./routes/loyality');

var express    = require('express')
var bodyParser = require('body-parser');


/**
 * This constructor ensures that the registry is singleton in nature
 * @param app
 * @returns {RoutesRegistry}
 * @constructor
 */
function RoutesRegistry(app) {
  "use strict";
  if (!(this instanceof RoutesRegistry)) {
    return new RoutesRegistry();
  }
}

/**
 * Initializes the module by registering all the routes
 * @param app
 */
RoutesRegistry.prototype.init = function (app) {
  "use strict";

  //Payout
  payoutAPI.init();
  app.post('/api/v1/payoutToUser', payoutAPI.payToUser);
  app.post('/api/v1/payoutToClient', payoutAPI.payToClient);

  //User API
  usersAPI.init();
  app.post('/api/v1/userSignup', usersAPI.signUp);
  app.post('/api/v1/userSignin', usersAPI.signIn);
  app.post('/api/v1/userChangePassword', usersAPI.changePassword);
  //app.post('/api/v1/userChangeEmail', usersAPI.changeEmail);
  app.post('/api/v1/userForgotPassword', usersAPI.forgotPassword);
  app.post('/api/v1/validateOtp',usersAPI.validateOtp);
  app.post('/api/v1/validateAccountOtp',usersAPI.validateAccountOtp);
  app.post('/api/v1/mobileVerifyStatus', usersAPI.mobileVerifyStatus);
  app.post('/api/v1/resendOtp',usersAPI.resendOtp);
  app.post('/api/v1/userResetPassword', usersAPI.resetPassword);
  app.post('/api/v1/getUserById', usersAPI.getUserById);
  app.post('/api/v1/validateUserToken', usersAPI.validateUserToken);
  app.post('/api/v1/usersByClient', usersAPI.usersByClient);
  app.post('/api/v1/getUserEarnings', usersAPI.getUserEarnings);
  app.post('/api/v1/getUserReferralList', usersAPI.getUserReferralList);
  app.post('/api/v1/getUserPayout', usersAPI.getUserPayout);
  app.post('/api/v1/getUserPayoutHistory', usersAPI.getUserPayoutHistory);
  app.post('/api/v1/getReferralData', usersAPI.getReferralData);
  app.post('/api/v1/getUserRafTransactions', usersAPI.getUserRafTransactions);
  app.post('/api/v1/addMobileUserReferral', usersAPI.addMobileUserReferral);
  app.post('/api/v1/addEmailUserReferral', usersAPI.addEmailUserReferral);
  app.post('/api/v1/unsubscribeEmail', usersAPI.unsubscribeEmail);
  app.post('/api/v1/getRecentUserFeedback', usersAPI.getRecentUserFeedback);
  app.post('/api/v1/updateUserFeedback', usersAPI.updateUserFeedback);
  app.post('/api/v1/loginOrSignupViaFB', usersAPI.loginOrSignupViaFB);

  //Merchants API
  merchants.init();
  app.post('/api/v1/merchant/action/getAll', merchants.getAll);
  app.post('/api/v1/getMerchantDailyOffers', merchants.getMerchantDailyOffers);
  app.post('/api/v1/getMerchantAllOffers', merchants.getMerchantAllOffers);
  app.post('/api/v1/pullMerchantOffers', merchants.pullMerchantOffers);
  app.post('/api/v1/pullAllMerchantOffersByClient', merchants.pullAllMerchantOffersByClient);
  app.post('/api/v1/getAllCarouselMerchants', merchants.getAllCarouselMerchants);
  app.post('/api/v1/getMerchantCashBachDetails', merchants.getMerchantCashBachDetails);
  app.post('/api/v1/getAllMerchants', merchants.getAll);
  app.post('/api/v1/getNonFeaturedMerchants', merchants.getNonFeaturedMerchants);
  app.post('/api/v1/merchant/action/getByName', merchants.getByName);
  app.post('/api/v1/featuredMerchantsByClientId', merchants.getAll);
  app.post('/api/v1/merchant/getById', merchants.getById);
  app.post('/api/v1/updateOfferStatusAndPriority', merchants.updateOfferStatusAndPriority);
  app.post('/api/v1/addOrUpdateFavouriteMerchants', merchants.addOrUpdateFavouriteMerchants);

  //Client API
  clientsAPI.init();
  app.post('/api/v1/clientSignup', clientsAPI.signUp);
  app.post('/api/v1/clientSignin', clientsAPI.signIn);
  app.post('/api/v1/getProfileInfo', clientsAPI.getProfileInfo);
  app.post('/api/v1/getClientRAFDisplayTerms', clientsAPI.getClientRAFDisplayTerms);
  app.post('/api/v1/getTestimonialsToShow', clientsAPI.getTestimonialsToShow);
  app.get('/api/v1/client/action/info', clientsAPI.info);
  app.post('/api/v1/clientChangePassword', clientsAPI.changePassword);
  app.get('/api/v1/adminClientInfo', clientsAPI.adminClientInfo);
  app.get('/api/v1/clientInfo', clientsAPI.info);
  app.post('/api/v1/clientInfoById', clientsAPI.infoById);
  app.post('/api/v1/validateClientToken', clientsAPI.validateClientToken);
  app.get('/api/v1/clientConfigInfo', clientsAPI.clientConfigInfo);
  app.post('/api/v1/updateClientSettings', clientsAPI.updateClientSettings);
  app.get('/api/v1/allClicks', clientsAPI.allClicks);
  app.post('/api/v1/updateClientConfigInfo', clientsAPI.updateClientConfigInfo);
  app.post('/api/v1/getDailyClientSummaryData', clientsAPI.getDailyClientSummaryData);
  app.post('/api/v1/getMonthlyClientSummaryData', clientsAPI.getMonthlyClientSummaryData);
  app.get('/api/v1/clientSummary', clientsAPI.clientSummary);
  app.get('/api/v1/getClientGuestUser', clientsAPI.getClientGuestUser);
  app.post('/api/v1/performanceReport', clientsAPI.performanceReport);
  app.post('/api/v1/conversionReport', clientsAPI.conversionReport);
  app.get('/api/v1/clientPayoutInfo', clientsAPI.clientPayoutInfo);
  app.get('/api/v1/clientPayoutHistory', clientsAPI.clientPayoutHistory);

  redirectpartner.init();
  app.post('/api/v1/deleteFeaturedMerchant', merchants.deleteFeaturedMerchant);
  app.post('/api/v1/updateFeaturedMerchant', merchants.updateFeaturedMerchant);
  app.post('/api/v1/addFeaturedMerchants', merchants.addFeaturedMerchants);
  app.post('/api/v1/getProductsBySearchString', merchants.getProductsBySearchString);

  //User Click API
  userClickAPI.init();
  app.post('/api/v1/userClickOffer', userClickAPI.click);
  app.post('/api/v1/updateClick', userClickAPI.updateclick);
  app.post('/api/v1/getUserClicks', userClickAPI.getUserClicks);
  app.post('/api/v1/offline/getClickInfo', userClickAPI.getClickInfo);

  //User Conversion API
  userConversionAPI.init();
  app.post('/api/v1/offline/getConversionInfo', userConversionAPI.getConversionInfo);
  app.post('/api/v1/offline/postConversion', userConversionAPI.postConversion);
  app.post('/api/v1/offline/updateConversion', userConversionAPI.updateConversion);
  app.post('/api/v1/getUserConversions', userConversionAPI.getUserConversions);
  
  //User Profile API
  app.post('/api/v1/addUserPaymentContact', userprofileAPI.addUserPaymentContact);
  app.post('/api/v1/getActiveNotificationTypesAndChannels', userprofileAPI.getActiveNotificationTypesAndChannels);
  app.post('/api/v1/getUserNotificationPreferances', userprofileAPI.getUserNotificationPreferances);
  app.post('/api/v1/updateUserNotificationsPreferances', userprofileAPI.updateUserNotificationsPreferances);
  app.post('/api/v1/pullUserPaymentContacts', userprofileAPI.pullUserPaymentContacts);
  app.post('/api/v1/deleteUserPaymentContact', userprofileAPI.deleteUserPaymentContact);
  app.post('/api/v1/updateProfile', userprofileAPI.updateProfile);
  
  app.get('/api/redirectpartner', redirectpartner.redirect);

  //SMS
  smsAPI.init();
  app.post('/api/v1/testsms', smsAPI.sendTestSMS);
  app.post('/api/v1/sendSMSToAdmin', smsAPI.sendSMSToAdmin);
  app.post('/api/v1/sendSMSToUser', smsAPI.sendSMSToUser);
  app.post('/api/v1/sendSMSToExisitngUser', smsAPI.sendSMSToExisitngUser);


  //Email
  smsAPI.init();
  app.post('/api/v1/testemail', emailAPI.sendTestEmail);
  app.post('/api/v1/sendPromoEmailToNonUser', emailAPI.sendPromoEmailToNonUser);
  app.post('/api/v1/sendPromoEmailToOnlineShoppers', emailAPI.sendPromoEmailToOnlineShoppers);
  app.post('/api/v1/sendEmailToExistingUser', emailAPI.sendEmailToExistingUser);
  

  //Util API
  utilAPI.init();
  app.get('/api/v1/countriesList', utilAPI.countriesList);
  app.get('/api/v1/categoriesList', utilAPI.categoriesList);
  app.post('/api/v1/upload', utilAPI.uploadImage);
  app.post('/api/v1/cashbackCalculator', utilAPI.cashbackCalculator);
  app.post('/api/v1/getShopperData', utilAPI.getShopperData);
  app.post('/api/v1/updateShopperData', utilAPI.updateShopperData);

  //onboarding API
  app.get('/api/v1/getOnBoardingData', onBoardingAPI.getOnBoardingData);
  app.post('/api/v1/saveOnBoardingData', onBoardingAPI.saveOnBoardingData);

  //Merchant Config API
  app.get('/api/v1/getMerchantSettings', merchants.getMerchantSettings);
  app.post('/api/v1/saveMerchantSettingsData', merchants.saveMerchantSettingsData);

  //Internal API
  internalAPI.init();
  app.post('/api/v1/internal/createClient', internalAPI.createClient);
  app.post('/api/v1/internal/approveClient', internalAPI.approveClient);
  app.post('/api/v1/internal/postConversions', internalAPI.postConversions);
  app.post('/api/v1/internal/setMerchantStatus', internalAPI.setMerchantStatus);
  app.post('/api/v1/internal/addOrUpdateMerchantCashback', internalAPI.addOrUpdateMerchantCashback);
  app.post('/api/v1/internal/updateMerchantOfferData', internalAPI.updateMerchantOfferData);
  app.post('/api/v1/internal/addMerchantAndOffer', internalAPI.addMerchantAndOffer);
  app.post('/api/v1/internal/getUserPayoutHistory', internalAPI.getUserPayoutHistory);
  app.post('/api/v1/internal/updateUserPayoutStatusToPaidFrmPending', internalAPI.updateUserPayoutStatusToPaidFrmPending);
  app.post('/api/v1/internal/getMetricsData', internalAPI.getMetricsData)
  app.post('/api/v1/internal/addMerchantPromotionOffers', internalAPI.addMerchantPromotionOffers);
  app.post('/api/v1/internal/updateMerchantPromotionOffers', internalAPI.updateMerchantPromotionOffers);

  //Loyality Rules
  // app.post('/api/v1/loyality/addRules', loyality.addRules);
  // app.get('/api/v1/loyality/listRules', loyality.listRules);
  // app.post('/api/v1/loyality/addClientUser', loyality.addClientUser);
  // app.post('/api/v1/loyality/rewardUser', loyality.rewardUser);
  // app.post('/api/v1/loyality/viewRule', loyality.viewRule);
  // app.post('/api/v1/loyality/editRule', loyality.editRule);

  //Internal Campaign APIs
  internalCampaignAPI.init();
  app.post('/api/v1/internal/campaign/generateRAFs', internalCampaignAPI.generateRAFs);

  //Extension APIs
  app.get('/api/v1/extension/merchantdetails', extension.merchantdetails);
  app.get('/api/v1/extension/config', extension.config);
  app.post('/api/v1/extension/signupFromExtension', extension.signupFromExtension);
};

/**
 * Export the route registery
 * @type {RoutesRegistry}
 */
module.exports = RoutesRegistry;
