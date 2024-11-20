import { memo } from "react";
import style from "../css/footer.module.css";
function Footer() {
  return (
    <div className={style.footer}>
      <div className={style.infoLink}>
        <div className={style.infoLinkChild}>
          <p className={style.logo}>Web Shop</p>
          <p>+1234 567 890</p>
          <p>999 Ranchview Dr. Smart, California 00000</p>
        </div>
        <div className={style.infoLinkChild}>
          <p className={style.head}>About</p>
          <p>Our Company</p>
          <p>Our Products</p>
          <p>Blog</p>
        </div>
        <div className={style.infoLinkChild}>
          <p className={style.head}>Support</p>
          <p>FAQ</p>
          <p>Terms & Conditions</p>
          <p>Privacy Policy</p>
        </div>
      </div>
      <hr />
      <div className={style.copyright}>
        Copyright © 2023 Web Shop | All rights reserved.
      </div>
    </div>
  );
}
export default memo(Footer);
