import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

export default function MyScreen() {
  const html = `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>환경이 나를 움직이게 하세요!</title>
</head>
<body style="margin:0;padding:20px 16px 80px;background:#ffffff;color:#111827;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Apple SD Gothic Neo','Noto Sans KR','Malgun Gothic',sans-serif;line-height:1.75;-webkit-font-smoothing:antialiased;">

  <p style="margin:0 0 16px;">새벽 1시.</p>
  <p style="margin:0 0 16px;">당신은 침대에 누워 폰을 켭니다.</p>

  <p style="margin:16px 0;">
    <strong style="font-weight:800;">&lt;약 없이 ADHD 탈출!&gt;</strong><br>
    <strong style="font-weight:800;">&lt;이것만 하면 ADHD 끝!&gt;</strong><br>
    <strong style="font-weight:800;">&lt;전문의 추천, ADHD 극복 꿀팁&gt;</strong>
  </p>

  <p style="margin:0 0 16px;">
    유튜브에는 ‘극복 노하우’가 넘쳐나지만, 다 아는 얘기죠.<br>
    뽀모도로, 운동하기, 명상하기, 할 일 쪼개기 등등. 댓글에는
    <strong style="font-weight:800;">“인생이 180도 바뀌었어요!”</strong>,
    <strong style="font-weight:800;">“드디어 정상인 됐어요!”</strong> 같은 성공담이 가득합니다.
  </p>

  <p style="margin:0 0 16px;">당신은 폰을 내려놓으며 혼잣말을 합니다.</p>

  <p style="margin:8px 0 16px;font-size:18px;line-height:1.9;"><strong style="font-weight:800;">“나도 다 해봤는데…… 왜 나만 안 되지?”</strong></p>

  <p style="margin:16px 0;">이런 이야기들은 오히려 나를 더 작게 만들어요. 내가 노력이 부족한 걸까? 더 열심히 해야 하나?</p>

  <h2 style="margin:24px 0 8px;font-size:20px;line-height:1.4;">문제가 뭘까요?</h2>
  <p style="margin:0 0 16px;">팁 대부분이 ‘의지력’을 요구하거든요. ADHD가 있으면 의지력이 들쭉날쭉한데, 그 의지력으로 문제를 해결하라니……!</p>

  <p style="margin:16px 0;">
    자, 그럼 발상을 바꿔볼까요? 💡<br>
    ‘내면’의 의지에 기대지 말고, ‘외부’ 환경을 이용하는 거예요.
  </p>

  <p style="margin:20px 0 8px;color:#16a34a;font-weight:900;font-size:22px;line-height:1.4;">
    환경이 나를 움직이게 하세요!<br>
    지금 바로 시도할 수 있는 환경 세팅 3가지
  </p>

  <!-- 섹션 1 -->
  <div style="margin:28px -16px 12px;padding:14px 16px;background:#f3f4f6;border-top:4px solid #e5e7eb;font-size:20px;font-weight:800;display:flex;align-items:center;gap:10px;">
    <span style="display:inline-grid;place-items:center;width:24px;height:24px;border-radius:999px;background:#111;color:#fff;font-weight:800;font-size:14px;">1</span>
    전날 밤, 머리맡에 약이랑 물병을 세팅해 두세요.
  </div>

  <figure style="margin:0 -16px 16px;">
    <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1600&auto=format&fit=crop"
         alt="머리맡 약과 물병 이미지(예시)"
         style="width:100%;max-width:100%;height:auto;display:block;">
  </figure>

  <p style="margin:0 0 16px;"><strong style="font-weight:800;">ADHD인의 아이러니!</strong><br>
    정신을 차리려면 약을 먹어야 하는데, 정신이 없어서 또 약 먹는 걸 깜빡하죠.</p>

  <p style="margin:16px 0;">전날 저녁부터 준비하는 건 어떨까요? <strong style="font-weight:800;">침대 옆에 약을 갖다 놓으세요!</strong></p>

  <p style="margin:8px 0 16px;">
    아침에 눈을 뜨자마자, 아니 의식이 완전히 돌아오기 전에 <strong style="font-weight:800;">자동으로 약을 입에 넣을 수 있게!</strong><br>
    생각할 시간을 주면 안 돼요! <strong style="font-weight:800;">무조건 반사적으로!</strong>
  </p>

  <p style="margin:16px 0;">요일별 약통이 있다고요? 솔직히 매주 일요일마다 약을 채워 넣는 것도 귀찮아서 결국 방치하게 되지 않나요?</p>

  <p style="margin:8px 0 16px;"><strong style="font-weight:800;">최대한 단순하게 가세요!</strong><br>
    복잡한 시스템은 ADHD와 잘 맞지 않아요. 단순할수록 성공률이 올라가요!</p>

  <div style="margin:16px 0;padding:14px 12px;border-radius:12px;background:#f3f4f6;">
    <p style="margin:0 0 8px;font-weight:800;">💊 추가 팁:</p>
    <p style="margin:8px 0;">
      약봉지에 <strong style="font-weight:800;">복용 날짜를 직접 써보세요.</strong><br>
      예를 들어 9/29, 9/30, 10/1 식으로, 매직펜으로 크게 표시하는 거예요.
    </p>
    <p style="margin:8px 0;">
      이러면 어느 날 약을 빼먹었는지 한눈에 알 수 있어요. 오늘이 27일인데 26일 약이 남아 있다면? 어제 복용을 깜빡한 거죠!
    </p>
    <p style="margin:8px 0;"><span style="background:linear-gradient(transparent 60%, rgba(22,163,74,.18) 0);padding:0 .1em;">‘심플 이즈 더 베스트!’</span></p>
  </div>

  <!-- 섹션 2 -->
  <div style="margin:28px -16px 12px;padding:14px 16px;background:#f3f4f6;border-top:4px solid #e5e7eb;font-size:20px;font-weight:800;display:flex;align-items:center;gap:10px;">
    <span style="display:inline-grid;place-items:center;width:24px;height:24px;border-radius:999px;background:#111;color:#fff;font-weight:800;font-size:14px;">2</span>
    딴짓에도 타이머를 쓰세요.
  </div>

  <figure style="margin:0 -16px 16px;">
    <img src="https://media.giphy.com/media/WrcQx2AzRk8c0/giphy.gif"
         alt="시계와 고양이 GIF(예시)"
         style="width:100%;max-width:100%;height:auto;display:block;">
  </figure>

  <p style="margin:0 0 16px;"><strong style="font-weight:800;">ADHD인은 시간 감각이 남들과 다르다</strong>는 사실, 알고 계시죠? 왜 그럴 걸까요?</p>

  <p style="margin:8px 0;">
    ‘스칼라 기대(Scalar Expectancy) 이론’에 따르면, 우리 뇌에는 시간을 가늠하는 ‘내부 시계’가 있어요.
    심장 박동, 주변 온도, 빛의 밝기 등 여러 신호를 뇌가 종합해서
    "지금쯤 한 시간쯤 흘렀겠다"라고 인식하는 거죠.
  </p>

  <p style="margin:8px 0 16px;">하지만 ADHD인은? 신경전달물질 차이 때문에 이런 정보를 제대로 처리하지 못해요. 그래서 내부 시계가 자꾸 어긋날 수밖에요.</p>

  <figure style="margin:0 -16px 16px;">
    <img src="https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=1600&auto=format&fit=crop"
         alt="손목시계를 보는 사람(예시)"
         style="width:100%;max-width:100%;height:auto;display:block;">
  </figure>

  <p style="margin:8px 0 0;">
    <strong style="font-weight:800;">해결 방법은 생각보다 간단해요.</strong><br>
    내부 시계가 말을 안 듣는다면, <strong style="font-weight:800;">외부 시계를 쓰면 되죠.</strong>
    (타이머/알람/포모도로를 ‘딴짓’에도 켜두기)
  </p>

  <!-- 필요 시 3번 섹션도 같은 패턴으로 추가 -->
</body>
</html>
`;
  return (
    <SafeAreaView style={styles.container}>
      <Text>웹뷰 예시</Text>
      <WebView
        source={{
          html,
        }}
        style={{ flex: 1 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
