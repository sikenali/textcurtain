<script setup lang="ts">
import { ref, computed } from 'vue'
import { TextCurtain } from 'text-curtain-vue'

const crownImages = [
  '/images/crown-jade.png',
  '/images/crown-fengguan.png',
  '/images/crown-ice.png',
  '/images/crown-gold.png',
  '/images/crown-empress.png',
  '/images/crown-bridal.png',
  '/images/crown-opera.png',
]

interface CrownScene {
  id: string
  name: string
  dynasty: string
  subtitle: string
  image: string
  charPool: string
  colors: string[]
}

const scenes: CrownScene[] = [
  {
    id: 'xia', name: '夏 · 禹迹', dynasty: '夏 约前2070',
    subtitle: '九州攸同 · 禹锡玄圭', image: crownImages[0],
    charPool: '夏禹治水九州攸同涂山会稽玄圭璋瓒华盖旒冕黻黼文章山龙藻火日月星辰宗彝华虫禹迹茫茫洪水滔天下民昏垫予乘四载随山刊木奠高山大川九河既道雷夏既泽桑土既蚕贡赋厥篚织文浮于济漯达于河',
    colors: ['#8B6914', '#B8860B', '#6B4E0A', '#A0822A'],
  },
  {
    id: 'shang', name: '商 · 玄鸟', dynasty: '商 约前1600',
    subtitle: '天命玄鸟 · 降而生商', image: crownImages[1],
    charPool: '天命玄鸟降而生商殷墟甲骨青铜礼器饕餮夔龙凤虎纹斝爵觚觯罍卣尊彝戈矛钺刀玉琮璧圭璋璜牙骨贝朋其丽不亿大邑商云雷蝉纹涡纹四羊方尊司母戊鼎后母辛钺妇好鸮尊',
    colors: ['#6B3A2A', '#8B5A3A', '#4A2818', '#7A4A3A'],
  },
  {
    id: 'zhou', name: '周 · 礼乐', dynasty: '周 前1046',
    subtitle: '郁郁乎文 · 吾从周', image: crownImages[2],
    charPool: '周虽旧邦其命维新郁郁乎文吾从周礼乐征伐自天子出钟鸣鼎食编钟磬鼓簋簠盨盉俎豆笾铏大雅小雅周颂鲁颂商颂关雎鹿鸣文王大明緜思齐皇矣灵台下武文王有声生民行苇既醉凫鹥假乐公刘泂酌卷阿民劳板荡抑桑柔瞻卬',
    colors: ['#2D6A4F', '#40916C', '#1B4332', '#52B788'],
  },
  {
    id: 'qin', name: '秦 · 威仪', dynasty: '秦 前221',
    subtitle: '秦王扫六合 · 虎视何雄哉', image: crownImages[3],
    charPool: '秦王扫六合虎视何雄哉挥剑决浮云诸侯尽西来明断自天启大略驾群才收兵铸金人函谷正东开会当凌绝顶一览众山小秦砖汉瓦万里长城阿房宫阙骊山陵寝兵马陶俑铜车马队权度量衡书同文车同轨郡县天下焚书坑儒泰山石刻琅琊台铭',
    colors: ['#4A4A4A', '#6B6B6B', '#2D2D2D', '#8B8B8B'],
  },
  {
    id: 'han', name: '汉 · 大风', dynasty: '汉 前206',
    subtitle: '大风起兮云飞扬', image: crownImages[4],
    charPool: '大风起兮云飞扬威加海内兮归故乡安得猛士兮守四方犯强汉者虽远必诛明犯强汉者虽远必诛丝绸之路凿空西域张骞班超苏武持节卫青霍去病封狼居胥长乐未央建章宫铜雀台汉隶帛书马王堆素纱蝉衣金缕玉衣长信宫灯博山炉错金银',
    colors: ['#8B1A1A', '#B22222', '#6B1010', '#A04040'],
  },
  {
    id: 'sanguo', name: '三国 · 英雄', dynasty: '三国 220',
    subtitle: '滚滚长江东逝水', image: crownImages[5],
    charPool: '滚滚长江东逝水浪花淘尽英雄是非成败转头空青山依旧在几度夕阳红白发渔樵江渚上惯看秋月春风一壶浊酒喜相逢古今多少事都付笑谈中天下大势分久必合合久必分既生瑜何生亮鞠躬尽瘁死而后已老骥伏枥志在千里宁可我负天下人',
    colors: ['#2B4C7A', '#3A6BA5', '#1A3050', '#5A8AC0'],
  },
  {
    id: 'jin', name: '晋 · 风流', dynasty: '晋 265',
    subtitle: '魏晋风度 · 东篱采菊', image: crownImages[6],
    charPool: '采菊东篱下悠然见南山此中有真意欲辨已忘言少无适俗韵性本爱丘山误落尘网中一去三十年羁鸟恋旧林池鱼思故渊开荒南野际守拙归园田兰亭集序永和九年群贤毕至少长咸集崇山峻岭茂林修竹清流激湍映带左右引以为流觞曲水列坐其次',
    colors: ['#5B6E3A', '#7A9150', '#3A4A28', '#9AB070'],
  },
  {
    id: 'nanbei', name: '南北朝 · 莲', dynasty: '南北朝 420',
    subtitle: '南朝四百八十寺', image: crownImages[0],
    charPool: '南朝四百八十寺多少楼台烟雨中千里莺啼绿映红水村山郭酒旗风天苍苍野茫茫风吹草低见牛羊敕勒川阴山下天似穹庐笼盖四野木兰辞唧唧复唧唧木兰当户织不闻机杼声唯闻女叹息愿为市鞍马从此替爷征将军百战死壮士十年归',
    colors: ['#6B4E7A', '#8B6A9A', '#4A3058', '#A080B0'],
  },
  {
    id: 'sui', name: '隋 · 大运', dynasty: '隋 581',
    subtitle: '万国来朝 · 运河烟柳', image: crownImages[1],
    charPool: '运河烟柳隋堤迢递龙舟南幸锦缆牙樯舳舻千里万国来朝大业千秋科举始兴进士及第开皇之治三省六部均田租调制南北一统海内殷富洛阳宫阙东都西苑通济永济邗沟江南渠',
    colors: ['#8B6E3A', '#A08850', '#6B5028', '#B09860'],
  },
  {
    id: 'tang', name: '翠羽 · 点翠', dynasty: '唐 宫廷',
    subtitle: '翠羽明珰 · 孔雀开屏', image: crownImages[2],
    charPool: '翠羽明珰孔雀开屏碧玉玲珑翡翠琉璃春水初生绿云扰扰青鸾起舞玉露金风兰叶葳蕤桂华秋皎池塘生春草园柳变鸣禽曲径通幽处禅房花木深绿竹入幽径青萝拂行衣蕉叶覆鹿松风煮茗竹雨谈诗兰亭修禊曲水流觞茂林修竹清流激湍映带左右天朗气清惠风和畅仰观宇宙俯察品类',
    colors: ['#5b9a7a', '#c89b3c', '#d4423e', '#7a9cc6'],
  },
  {
    id: 'song', name: '冰鸾 · 霜月', dynasty: '宋 霜月',
    subtitle: '冰肌玉骨 · 月明千里', image: crownImages[3],
    charPool: '冰肌玉骨月明千里琼楼玉宇高处不胜寒起舞弄清影何似在人间银装素裹千树万树梨花开忽如一夜春风来北风卷地白草折胡天八月即飞雪瀚海阑干百丈冰愁云惨淡万里凝寒光照铁衣朔气传金柝雪拥蓝关马不前云横秦岭家何在梅须逊雪三分白雪却输梅一段香日暮苍山远天寒白屋贫柴门闻犬吠风雪夜归人',
    colors: ['#7a9cc6', '#c89b3c', '#5b9a7a', '#d4423e'],
  },
  {
    id: 'yuan', name: '元 · 弓弦', dynasty: '元 1271',
    subtitle: '一代天骄 · 弓弦万里', image: crownImages[4],
    charPool: '一代天骄成吉思汗只识弯弓射大雕俱往矣数风流人物还看今朝大漠孤烟直长河落日圆塞下秋来风景异衡阳雁去无留意千嶂里长烟落日孤城闭葡萄美酒夜光杯欲饮琵琶马上催醉卧沙场君莫笑古来征战几人回',
    colors: ['#4A5A6B', '#6A7A8B', '#2A3A4B', '#8A9AAB'],
  },
  {
    id: 'fengguan', name: '凤冠 · 万历', dynasty: '明 万历',
    subtitle: '点翠嵌宝 · 六龙三凤', image: crownImages[5],
    charPool: '凤冠霞帔金翠蓝宝珠玉花翎点翠流苏珍珠簪钗凰羽鸾鸟朝云锦绣华章璎珞垂珠銮殿宫灯烛影红妆嫁衣良辰吉时凤舞龙翔祥云瑞气琉璃翡翠玛瑙琥珀鎏金錾花累丝嵌宝步摇金钿花钿眉黛胭脂绮罗绫缎凤求凰比翼连理同心百年好合天作之合',
    colors: ['#d4423e', '#c89b3c', '#5b9a7a', '#7a9cc6'],
  },
  {
    id: 'jinzan', name: '金簪 · 婚仪', dynasty: '明 婚仪',
    subtitle: '金枝玉叶 · 十里红妆', image: crownImages[6],
    charPool: '金枝玉叶菊瓣累丝桃腮贝母十里红妆凤冠霞帔珠围翠绕花好月圆洞房花烛金玉良缘白首偕老琴瑟和鸣鸾凤和鸣秦晋之好天作之合佳偶天成郎才女貌举案齐眉相敬如宾百年好合早生贵子多子多福金玉满堂花开富贵吉祥如意龙凤呈祥双喜临门喜上眉梢红鸾星动良辰美景赏心乐事',
    colors: ['#d4423e', '#c89b3c', '#5b9a7a', '#7a9cc6'],
  },
  {
    id: 'fenghou', name: '凤后 · 永乐', dynasty: '明 永乐',
    subtitle: '九龙四凤 · 母仪天下', image: crownImages[0],
    charPool: '母仪天下九龙四凤翚翟褘衣珠翠点染龙翔凤舞金龙衔珠翠云铺顶宝钿花树博鬓垂珠青纁玉佩山河永固社稷安宁凤印玺绶椒房殿宇长信宫灯坤宁昭阳德配天地泽被苍生垂帘听政懿旨凤诏册立大典宗庙礼乐钟鼎彝器玉圭金册翟车凤辇仪仗卤簿宫娥彩仗琼林玉树瑶台阆苑',
    colors: ['#d4423e', '#c89b3c', '#5b9a7a', '#7a9cc6'],
  },
  {
    id: 'xifeng', name: '戏凤 · 梨园', dynasty: '清 梨园',
    subtitle: '点翠戏装 · 珠络垂旒', image: crownImages[1],
    charPool: '梨园惊梦戏台锣鼓水袖青衣花旦刀马武生老生净丑唱念做打生旦净末雅韵霓裳羽衣水磨腔昆曲京韵西皮二黄梆子板眼工尺曲牌折子戏出将入相粉墨登场余音绕梁字正腔圆声情并茂台上一分钟台下十年功红氍毹翎子帔靠蟒袍玉带凤目蛾眉贴片点绛唇勾脸谱亮相圆场走边趟马起霸',
    colors: ['#c89b3c', '#d4423e', '#5b9a7a', '#7a9cc6'],
  },
  {
    id: 'jinluan', name: '金銮 · 乾隆', dynasty: '清 乾隆',
    subtitle: '龙腾凤翥 · 金漆描金', image: crownImages[2],
    charPool: '金銮夜宴龙腾凤翥九重宫阙紫气东来鎏金错彩黑漆描金牡丹缠枝双龙戏珠丹凤朝阳华灯初上钟鸣鼎食玉楼金殿琼浆玉液夜光杯葡萄美酒琥珀光将进酒杯莫停天生我材必有用千金散尽还复来烹羊宰牛且为乐会须一饮三百杯钟鼓馔玉不足贵但愿长醉不复醒古来圣贤皆惟有饮者留其名',
    colors: ['#c89b3c', '#d4423e', '#5b9a7a', '#7a9cc6'],
  },
]

const index = ref(0)
const scene = computed(() => scenes[index.value])
const prevIdx = computed(() => (index.value - 1 + scenes.length) % scenes.length)
const nextIdx = computed(() => (index.value + 1) % scenes.length)

let transitioning = false
function goTo(i: number) {
  if (transitioning) return
  transitioning = true
  index.value = i
  setTimeout(() => { transitioning = false }, 400)
}
</script>

<template>
  <div class="scroll">
    <div class="grain" aria-hidden="true" />

    <div class="ink-top" aria-hidden="true">
      <svg width="100%" height="100%" viewBox="0 0 1200 40" preserveAspectRatio="none">
        <path d="M0,20 Q60,0 120,20 T240,20 T360,20 T480,20 T600,20 T720,20 T840,20 T960,20 T1080,20 T1200,20" stroke="rgba(74,58,40,0.06)" stroke-width="1.5" fill="none" />
      </svg>
    </div>

    <header class="header">
      <div class="brand">
        <span class="brand-cn">历代冠饰</span>
        <span class="brand-en">Crowns of Imperial China</span>
      </div>
      <div class="header-nav">
        <button class="nav-btn" @click="goTo(prevIdx)" aria-label="上一件">‹</button>
        <span class="page-num">{{ String(index + 1).padStart(2, '0') }} / {{ String(scenes.length).padStart(2, '0') }}</span>
        <button class="nav-btn" @click="goTo(nextIdx)" aria-label="下一件">›</button>
      </div>
    </header>

    <div class="stage">
      <div class="info-panel">
        <div class="dynasty-tag">{{ scene.dynasty }}</div>
        <h1 class="crown-name">{{ scene.name }}</h1>
        <p class="crown-subtitle">{{ scene.subtitle }}</p>
      </div>

      <div class="crown-area" :key="`wrap-${scene.id}`">
        <div class="crown-shadow" aria-hidden="true" />
        <img
          :id="`roof-${scene.id}`"
          :src="scene.image"
          :alt="scene.name"
          class="crown-img"
          crossOrigin="anonymous"
        />
      </div>

      <div class="curtain-area" :key="`ctn-${scene.id}`">
        <TextCurtain
          :charPool="scene.charPool"
          :colors="scene.colors"
          :inkAlpha="0.50"
          :luminous="false"
          :contourSelector="`#roof-${scene.id}`"
        />
      </div>
    </div>

    <button class="side-nav side-left" @click="goTo(prevIdx)" aria-label="上一件">
      <img :src="scenes[prevIdx].image" alt="" class="side-thumb" />
      <span class="side-label">
        <span class="l1">{{ scenes[prevIdx].name.split(' · ')[0] }}</span>
        <span class="l2">·</span>
        <span class="l3">{{ scenes[prevIdx].name.split(' · ')[1] }}</span>
      </span>
    </button>
    <button class="side-nav side-right" @click="goTo(nextIdx)" aria-label="下一件">
      <img :src="scenes[nextIdx].image" alt="" class="side-thumb" />
      <span class="side-label">
        <span class="l1">{{ scenes[nextIdx].name.split(' · ')[0] }}</span>
        <span class="l2">·</span>
        <span class="l3">{{ scenes[nextIdx].name.split(' · ')[1] }}</span>
      </span>
    </button>

    <div class="bottom-dots">
      <button
        v-for="(s, i) in scenes"
        :key="s.id"
        :class="['dot', { active: i === index }]"
        @click="goTo(i)"
        :aria-label="s.name"
      />
    </div>
  </div>
</template>

<style scoped>
.scroll {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #f5efe6;
  overflow: hidden;
  font-family: 'Songti SC', 'Noto Serif SC', Georgia, 'Times New Roman', serif;
  color: #3a2a1e;
}

.grain {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.25;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E");
}

.ink-top {
  position: absolute;
  top: 0;
  left: 48px;
  right: 48px;
  height: 40px;
  z-index: 40;
  pointer-events: none;
}

.header {
  position: relative;
  z-index: 30;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 52px 10px 52px;
}
.brand {
  display: flex;
  align-items: baseline;
  gap: 14px;
}
.brand-cn {
  font-size: 17px;
  font-weight: 500;
  letter-spacing: 0.25em;
}
.brand-en {
  font-size: 10px;
  letter-spacing: 0.08em;
  color: rgba(74, 58, 40, 0.35);
  font-family: Georgia, serif;
  font-style: italic;
}
.header-nav {
  display: flex;
  align-items: center;
  gap: 10px;
}
.nav-btn {
  background: none;
  border: none;
  font-size: 20px;
  color: rgba(74, 58, 40, 0.35);
  cursor: pointer;
  padding: 0 4px;
  transition: color 0.3s;
  line-height: 1;
}
.nav-btn:hover { color: rgba(74, 58, 40, 0.7); }
.page-num {
  font-size: 11px;
  font-family: monospace;
  color: rgba(74, 58, 40, 0.3);
  letter-spacing: 0.05em;
}

.stage {
  position: absolute;
  inset: 56px 0 0 0;
}
.stage > * { pointer-events: none; }
.stage .curtain-area { pointer-events: auto; }

.info-panel {
  position: absolute;
  left: 52px;
  top: 3%;
  z-index: 20;
}
.dynasty-tag {
  font-size: 10px;
  letter-spacing: 0.18em;
  font-family: monospace;
  color: rgba(74, 58, 40, 0.4);
  margin-bottom: 8px;
}
.crown-name {
  font-size: 38px;
  font-weight: 400;
  letter-spacing: 0.3em;
  line-height: 1.1;
  margin-bottom: 6px;
}
.crown-subtitle {
  font-size: 12px;
  letter-spacing: 0.1em;
  color: rgba(74, 58, 40, 0.45);
}

.crown-area {
  position: absolute;
  left: 50%;
  top: 5%;
  transform: translateX(-50%);
  width: clamp(200px, 22vw, 380px);
  z-index: 12;
}
.crown-shadow {
  position: absolute;
  left: 50%;
  top: 8%;
  width: 180%;
  height: 80%;
  transform: translateX(-50%);
  background: radial-gradient(ellipse at center, rgba(120,100,80,0.08) 0%, transparent 72%);
  filter: blur(14px);
  pointer-events: none;
}
.crown-img {
  display: block;
  width: 100%;
  height: auto;
  position: relative;
  z-index: 1;
}

.curtain-area {
  position: absolute;
  left: 50%;
  top: 5%;
  bottom: 14%;
  transform: translateX(-50%);
  width: min(calc(clamp(200px, 22vw, 380px) * 0.78 + 40vw), 96vw);
  z-index: 8;
}

.side-nav {
  position: absolute;
  top: 30%;
  z-index: 25;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  width: 64px;
  padding: 6px 8px 5px;
  background: rgba(245, 239, 230, 0.75);
  border: 1px solid rgba(74, 58, 40, 0.1);
  cursor: pointer;
  transition: border-color 0.3s;
  pointer-events: auto;
}
.side-nav:hover { border-color: rgba(74, 58, 40, 0.3); }
.side-left { left: 10px; }
.side-right { right: 10px; }
.side-thumb {
  width: 44px;
  height: 26px;
  object-fit: contain;
  opacity: 0.6;
  transition: opacity 0.3s;
}
.side-nav:hover .side-thumb { opacity: 1; }
.side-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1.15;
  color: rgba(74, 58, 40, 0.4);
  font-family: monospace;
}
.side-label .l1 {
  font-size: 9px;
  letter-spacing: 0.1em;
}
.side-label .l2 {
  font-size: 6px;
  opacity: 0.5;
  line-height: 1;
}
.side-label .l3 {
  font-size: 8px;
  letter-spacing: 0.05em;
}

.bottom-dots {
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
  z-index: 30;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 80vw;
}
.dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  border: 1px solid rgba(74, 58, 40, 0.15);
  background: transparent;
  cursor: pointer;
  transition: all 0.3s;
  flex-shrink: 0;
}
.dot:hover { border-color: rgba(74, 58, 40, 0.4); }
.dot.active {
  background: #8B1A1A;
  border-color: #8B1A1A;
}
</style>
