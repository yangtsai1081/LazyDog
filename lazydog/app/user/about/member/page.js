import Header from "../../../components/layout/header";
import Bread from "../../../components/teacher/breadcrumb";
export default async function MemberPage(props) {
  return (
    <>
      <Header />
      <div className="container-fluid lumi-all-wrapper my-3">
        <Bread
          links={[
            { label: "首頁 ", href: "/" },
            { label: " 關於我們", href: "/teacher" },


              {
                label: "會員條款條款與細則",
                href: "/user/about/member",
                active: true,
              },
            ]}
          />
          <div className="row flex-nowrap">
            <div className="col py-3">
              <h3 className="my-5">會員條款條款與細則</h3>
              <div className="mb-5">
                <h5 className="my-4">一、認知與接受條款</h5>
                <p className="lead">
                  「LAZYDOG」(以下簡稱「本公司」)係依據本服務條款提供「LAZYDOG」服務
                  (以下簡稱「本服務」)。當會員完成本公司之會員註冊手續、或開始使用本服務時，即表示已閱讀、瞭解並同意接受本服務條款之所有內容，並完全接受本服務現有與未來衍生的服務項目及內容。
                </p>
                <p className="lead">
                  本公司有權於任何時間修改或變更本服務條款之內容，修改後的服務條款內容將公佈網站上，本公司將不會個別通知會員，建議會員隨時注意該等修改或變更。會員於任何修改或變更後繼續使用本服務時，視為會員已閱讀、瞭解並同意接受該等修改或變更。若不同意上述的服務條款修訂或更新方式，或不接受本服務條款的其他任一約定，會員應立即停止使用本服務。
                </p>
                <p className="lead">
                  若會員為未滿二十歲之未成年人，應於會員的家長(或監護人)閱讀、瞭解並同意本約定書之所有內容及其後修改變更後，方得註冊為會員、使用或繼續使用本服務。當會員使用或繼續使用本服務時，即推定會員的家長(或監護人)已閱讀、瞭解並同意接受本約定書之所有內容及其後修改變更。
                </p>
                <p className="lead">
                  會員及本公司雙方同意使用本服務之所有內容包括意思表示等，以電子文件作為表示方式。
                </p>
              </div>
              <div className="mb-5">
                <h5 className="my-4">二、會員的註冊義務</h5>
                為了能使用本服務，會員需同意以下事項：
                <p className="lead">
                  依本服務註冊表之提示提供會員本人正確、最新的資料，且不得以第三人之名義註冊為會員。每位會員僅能註冊登錄一個帳號，不可重覆註冊登錄。
                </p>
                <p className="lead">
                  即時維持並更新會員個人資料，確保其正確性，以獲取最佳之服務。
                </p>
                <p className="lead">
                  若會員提供任何錯誤或不實的資料、或未按指示提供資料、或欠缺必要之資料、或有重覆註冊帳號等情事時，本公司有權不經事先通知，逕行暫停或終止會員的帳號，並拒絕會員使用本服務之全部或一部。
                </p>
              </div>
              <div className="mb-5">
                <h5 className="my-4">三、本公司隱私權政策</h5>
                <p className="lead">
                  關於會員的註冊以及其他特定資料依本公司「隱私權政策」受到保護與規範。
                </p>
              </div>
              <div className="mb-5">
                <h5 className="my-4">四、會員帳號、密碼及安全</h5>
                <p className="lead">
                  完成本服務的登記程序之後，會員將取得一個特定之密碼及會員帳號，維持密碼及帳號之機密安全，是會員的責任。任何依照規定方法輸入會員帳號及密碼與登入資料一致時，無論是否由本人親自輸入，均將推定為會員本人所使用，利用該密碼及帳號所進行的一切行動，會員本人應負完全責任。
                </p>
                <p className="lead">會員同意以下事項：</p>
                <ul>
                  <li>
                    {" "}
                    會員的密碼或帳號遭到盜用或有其他任何安全問題發生時，會員將立即通知本公司。
                  </li>
                  <li>每次連線完畢，均結束會員的帳號使用。</li>
                  <li>
                    會員的帳號、密碼及會員權益均僅供會員個人使用及享有，不得轉借、轉讓他人或與他人合用
                  </li>
                  <li>
                    帳號及密碼遭盜用、不當使用或其他本公司無法辯識是否為本人親自使用之情況時，對此所致之損害，除證明係因可歸責於本公司之事由所致，本公司將不負任何責任。
                  </li>
                  <li>
                    本公司若知悉會員之帳號密碼確係遭他人冒用時，將立即暫停該帳號之使用(含該帳號所生交易之處理)。
                  </li>
                </ul>
              </div>
              <div className="mb-5">
                <h5 className="my-4">五、兒童及青少年之保護</h5>
                <p className="lead">
                  為確保兒童及青少年使用網路的安全，並避免隱私權受到侵犯，家長(或監護人)應盡到下列義務：未滿十二歲之兒童使用本服務時，應全程在旁陪伴，十二歲以上未滿十八歲之青少年使用本服務前亦應斟酌是否給予同意。
                </p>
              </div>
              <div className="mb-5">
                <h5 className="my-4">六、使用者的守法義務及承諾</h5>
                <p className="lead">
                  會員承諾絕不為任何非法目的或以任何非法方式使用本服務，並承諾遵守中華民國相關法規及一切使用網際網路之國際慣例。會員若係中華民國以外之使用者，並同意遵守所屬國家或地域之法令。
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
