import 'package:flutter/material.dart';
import 'package:health_care_website/view/widget/base/base_scaffold.dart';

class PrivacyPage extends StatelessWidget {
  const PrivacyPage({super.key});

  @override
  Widget build(BuildContext context) {
    return const BaseScaffold(
      body: Text.rich(
        softWrap: true,
        TextSpan(
          children: [
            TextSpan(
              text: "隱私權政策聲明\n",
              style: TextStyle(
                fontSize: 28,
                fontWeight: FontWeight.bold,
                height: 3,
              ),
            ),
            TextSpan(
              text:
                  "親愛的朋友，感謝您蒞臨國立中央大學(以下簡稱本網站)，關於您的個人隱私權，本網站絕對尊重並予以保護。為了讓您能夠更安心的使用本網站所提供之各項服務，特於此向您說明本網站的隱私權保護政策。\n",
            ),
            TextSpan(
              text: "一、本聲明適用範圍\n",
              style: TextStyle(
                fontWeight: FontWeight.bold,
                height: 3,
              ),
            ),
            TextSpan(
              text:
                  "本聲明適用於所有以國立中央大學名義申請之網域(Domain Name即www.ncu.edu.tw)所架設之網站，如secret.ncu.edu.tw、cc.ncu.edu.tw等均適用本聲明，但不適用於本網站功能連結之各政府機關網站或其他對外連結，您必須參考該連結網站中的隱私權保護政策，本網站不負任何連帶責任。\n",
            ),
            TextSpan(
              text: "二、關於個人資料之蒐集\n",
              style: TextStyle(
                fontWeight: FontWeight.bold,
                height: 3,
              ),
            ),
            TextSpan(
              text:
                  "當您在瀏覽本網站或下載檔案時，並不會蒐集任何有關您的個人身份資料。而本網站提供之各項線上服務，將視服務需求請您提供姓名、身分證字號、聯絡電話、e-mail、通訊住址等個人最新、最真實之資料。本網站所蒐集之個人資料，將在國立中央大學所提供的業務範圍內或依法得為交互運用之規範下進行，除法律另有規定外，不會將其做為超出蒐集之特定目的以外之用途。\n",
            ),
            TextSpan(text: "\n", style: TextStyle(height: 0.5)),
            TextSpan(
              text:
                  "此外，本網站在您使用服務信箱或其他互動性功能時，會保留您所提供的姓名、身分證字號、電子郵件地址、連絡方式及使用時間等。當您在瀏覽或查詢網頁資料時，本網站亦會保留伺服器自行產生的相關紀錄，包括您使用連線設備的IP位址、使用時間、瀏覽及點擊資料等紀錄，這些資料將提供本網站內部進行網路流量和行為的調查分析，以利於提升本網站的服務品質，並不會針對個別使用者進行資料對應或分析。\n",
            ),
            TextSpan(text: "\n", style: TextStyle(height: 0.5)),
            TextSpan(
              text:
                  "本網站有義務保護您的隱私，在未取得您的同意下，不會任意修改或刪除任何您的個人資料及檔案。除非經過您同意或符合以下情況始得為之：\n",
            ),
            TextSpan(text: "\n", style: TextStyle(height: 0.5)),
            TextSpan(text: "　　1.經由合法的途徑。\n"),
            TextSpan(text: "　　2.保護或防衛相關網路民眾的權利或所有權。\n"),
            TextSpan(text: "　　3.為保護本網站各相關單位之權益。\n"),
            TextSpan(text: "\n", style: TextStyle(height: 0.5)),
            TextSpan(
              text: "本網站絕不會任意出售、交換、或出租任何您的個人資料給其他團體、個人或私人企業。而下列情形者除外：\n",
            ),
            TextSpan(text: "\n", style: TextStyle(height: 0.5)),
            TextSpan(text: "　　1.配合司法單位合法的調查。\n"),
            TextSpan(text: "　　2.依法配合相關權責機關依職務需要之調查或使用。\n"),
            TextSpan(text: "　　3.符合相關法令與規範之安全保護要求下，進行網站服務維護管理及系統調整等作業。\n"),
            TextSpan(
              text: "三、網站安全機制\n",
              style: TextStyle(
                fontWeight: FontWeight.bold,
                height: 3,
              ),
            ),
            TextSpan(
              text:
                  "本網站將盡力建置完善之安全保護措施，運用軟硬體設備建置網路安全機制，網站主機不定期進行弱點掃描與系統漏洞修補。本網站亦裝置網路記錄分析系統，偵測網路異常紀錄與資訊，對於破壞性行為或企圖侵入伺服主機之異常行為，將依相關安全規範進行攔阻，並通報警政單位。\n",
            ),
            TextSpan(
              text: "四、個人資料的利用及傳輸\n",
              style: TextStyle(
                fontWeight: FontWeight.bold,
                height: 3,
              ),
            ),
            TextSpan(
              text:
                  "本網站有權於特定目的或法令許可範圍內，對取得之個人資料進行保管、利用、處理或傳輸，期間自該項服務啟始日起，至服務停止後六個月為止，利用地區為臺灣地區。本網站將盡力以合理之技術及程序，以維護所有個人資料之安全。\n",
            ),
            TextSpan(
              text: "五、Cookies的運用與政策\n",
              style: TextStyle(
                fontWeight: FontWeight.bold,
                height: 3,
              ),
            ),
            TextSpan(
              text:
                  "本網站使用Cookies作為與您溝通與辨識的工具，目的在於提供您更好的服務，以及方便您參與個人化的互動活動。此外，為了統計瀏覽人數及分析瀏覽模式，做為本網站改善服務之參考，會在您瀏覽器中寫入並讀取 Cookies 。如果您不希望接受Cookies，您可以在瀏覽器之設定選項中(如IE 之「Internet選項」的「安全性」)修改您對Cookies的接受程度。如果您選擇拒絕所有的 Cookies，可能會導致您無法使用本網站服務，或是參與部分的活動。\n",
            ),
            TextSpan(
              text: "六、自我保護措施\n",
              style: TextStyle(
                fontWeight: FontWeight.bold,
                height: 3,
              ),
            ),
            TextSpan(
              text:
                  "請妥善保管您的個人資料、帳號、憑證及密碼等相關資料，勿將其提供給第三者，尤其是密碼；在您使用本網站所提供之各項服務功能後，請務必登出帳號。若您是與他人共享電腦或使用公共電腦，使用完畢切記要關閉瀏覽器視窗，以防止他人讀取您的資料。\n",
            ),
            TextSpan(
              text: "七、其他\n",
              style: TextStyle(
                fontWeight: FontWeight.bold,
                height: 3,
              ),
            ),
            TextSpan(
              text:
                  "本網站將因應社會環境及法令規定之變遷或科技技術進步，不定時修訂與公布本項政策聲明，並採用最新技術與法規盡力保護您的網路隱私，請您隨時上網閱覽本政策，以保障您的權益。\n",
            ),
          ],
          style: TextStyle(
            fontSize: 18,
          ),
        ),
      ),
    );
  }
}
