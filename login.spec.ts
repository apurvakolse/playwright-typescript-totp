import * as OTPAuth from 'otpauth'; 

 

export class LoginPage { 

  readonly page: Page; 

 

  private readonly loginButton: Locator; 

  private readonly userNameInput: Locator; 

  private readonly passwordInput: Locator; 

  private readonly emailDisplay: Locator; 

  private userEmail: any; 

  private readonly authCode: Locator; 

  private readonly submitAuthCode: Locator; 

 

  constructor(page: Page) { 

    this.page = page; 

    this.loginButton = page.getByTestId(AppUniqueId.login_submitButton); 

    this.userNameInput = page.getByTestId(AppUniqueId.login_username); 

    this.passwordInput = page.getByTestId(AppUniqueId.login_password); 

    this.emailDisplay = page.getByTestId(AppUniqueId.personalDetails_email); 

    this.authCode = page.locator('#root > div > div > section > main > div > div > div > input'); 

    this.submitAuthCode = page.locator('#root > div > div > section > main > div > div > button'); 

  } 

 

  async waitFor(ms: number) { 

    return new Promise(resolve => setTimeout(resolve, ms)); 

} 

  async loginUserUI(childUser: User) { 

    let totp = new OTPAuth.TOTP({ 

      issuer: "ISSUER", 

      label: "LABLE", 

      algorithm: "SHA1", 

      digits: 6, 

      period: 30, 

      secret: "XXXXXXXXXX” 

    }); 

    await this.userNameInput.fill(await childUser.username); 

    await this.passwordInput.fill(await childUser.password); 

    await this.loginButton.click(); 

    try{ 

      let token = totp.generate() 

      await this.authCode.fill(token, { timeout: 5000}); 

      await this.submitAuthCode.click() 

    }catch(err) 

    { 

 

    } 

 

  } 

 

  async verifyLoginUserEmail(childUser: User) { 

    this.userEmail = childUser.username; 

    try{ 

      await this.page.locator("div[class='col-sm-12 d-flex impersonation-bar'] a").click() 

      }catch(err) 

      { 

   

      } 

  } 

} 
