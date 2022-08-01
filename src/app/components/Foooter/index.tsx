import React from "react";
import Button from "../Common/Button";
import style from "./Footer.module.scss";
import DocumentIcon from "app/components/Common/Icons/DocumentIcon.svg";
import PhoneIcon from "app/components/Common/Icons/PhoneIcon.svg";

const Footer: React.FC<{}> = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.top__bar}>
        <div className={style.container}>
          <div className={style.top__bar__inner__wrapper}>
            <p className={style.text}>Ugulamayı indirin</p>
            <img
              className={style.app__banner}
              src={process.env.PUBLIC_URL + "/assets/app_store.png"}
            ></img>
            <img
              className={style.app__banner}
              src={process.env.PUBLIC_URL + "/assets/google_play.png"}
            ></img>
            <img
              className={style.app__banner}
              src={process.env.PUBLIC_URL + "/assets/app_gallery.png"}
            ></img>
          </div>
          <div className={style.top__bar__inner__wrapper}>
            <p className={style.text}>Bizi takip edin</p>
            <img
              className={style.contact__button}
              src={process.env.PUBLIC_URL + "/assets/facebook.png"}
            ></img>
            <img
              className={style.contact__button}
              src={process.env.PUBLIC_URL + "/assets/linkedin.png"}
            ></img>{" "}
            <img
              className={style.contact__button}
              src={process.env.PUBLIC_URL + "/assets/instagram.png"}
            ></img>{" "}
            <img
              className={style.contact__button}
              src={process.env.PUBLIC_URL + "/assets/youtube.png"}
            ></img>
          </div>
        </div>
      </div>
      <div className={style.bottom__bar}>
        <div className={style.container}>
          <div className={style.map__wrapper}>
            <div className={style.map__inner__wrapper}>
              <p className={style.header}>Yardım</p>
              <p className={style.text}>Sıkça sorulan sorular</p>
              <p className={style.text}>İade ve değişim</p>
              <p className={style.text}>Site haritası</p>
              <p className={style.text}>Kullanım koşulları</p>
              <p className={style.text}>İşlem Rehberi</p>
            </div>
            <div className={style.map__inner__wrapper}>
              <p className={style.header}>Kurumlar</p>
              <p className={style.text}>Hakkımızda</p>
              <p className={style.text}>Mağazalarımız</p>
              <p className={style.text}>Kurulsal/Corporate</p>
              <p className={style.text}>Kariyer Fırsatları</p>
              <p className={style.text}>Kurumsal Destek</p>
              <p className={style.text}>Hediye Kart</p>
            </div>
            <div className={style.map__inner__wrapper}>
              <p className={style.header}>Politikalar</p>
              <p className={style.text}>Aydınlatma Metni</p>
              <p className={style.text}>
                Veri gizliliği ve güvenliği politikası
              </p>
            </div>
          </div>
          <div className={style.contacts__wrapper}>
            <p className={style.header}>LC Waikiki Destek</p>
            <Button fontSize="md" variant="outlined">
              <img className={style.button__icon} src={DocumentIcon}></img>{" "}
              İletişim Formu
            </Button>
            <Button fontSize="md" variant="outlined">
              <img className={style.button__icon} src={PhoneIcon}></img> 444 4
              529
            </Button>
            <Button fontSize="md" variant="outlined">
              <img
                className={style.button__icon}
                src={process.env.PUBLIC_URL + "/assets/whatsapp_color.png"}
              ></img>
              Whatsapp Destek 444 4 529
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
