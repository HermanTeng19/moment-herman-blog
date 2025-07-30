import GameRating from '../components/GameRating';
import CombatDemo, { Skill } from '../components/CombatDemo';
import CharacterCard from '../components/CharacterCard';
import BattleReplay, { BattleScene } from '../components/BattleReplay';
import TeamSpirit, { Member } from '../components/TeamSpirit';
import GameStats, { Stat } from '../components/GameStats';

export default function TestComponents() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">组件测试页面</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">游戏评分组件</h2>
          <GameRating 
            graphics={9.5}
            gameplay={9.0}
            story={8.5}
            music={9.0}
            overall={9.0}
          />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">战斗技能树</h2>
          <CombatDemo>
            <Skill name="定海神针" level={5} description="基础攻击技能，可升级为群体攻击" />
            <Skill name="筋斗云" level={3} description="快速移动技能，消耗法力值" />
            <Skill name="火眼金睛" level={4} description="侦查技能，可发现隐藏敌人" />
            <Skill name="如意金箍棒" level={5} description="终极技能，造成巨大伤害" />
          </CombatDemo>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">角色卡片</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <CharacterCard name="孙悟空" role="主角" power="齐天大圣" />
            <CharacterCard name="唐僧" role="师父" power="金蝉子转世" />
            <CharacterCard name="猪八戒" role="师弟" power="天蓬元帅" />
            <CharacterCard name="沙僧" role="师弟" power="卷帘大将" />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">战斗回放</h2>
          <BattleReplay>
            <BattleScene 
              boss="牛魔王"
              duration="8:32"
              difficulty="困难"
              strategy="利用七十二变躲避攻击，寻找破绽反击"
            />
          </BattleReplay>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">团队精神</h2>
          <TeamSpirit>
            <Member name="悟空" contribution="战斗主力" />
            <Member name="唐僧" contribution="精神领袖" />
            <Member name="八戒" contribution="幽默担当" />
            <Member name="沙僧" contribution="后勤保障" />
          </TeamSpirit>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">游戏统计</h2>
          <GameStats>
            <Stat label="游戏时长" value="68小时" />
            <Stat label="完成度" value="92%" />
            <Stat label="成就解锁" value="45/50" />
            <Stat label="收集要素" value="87/100" />
          </GameStats>
        </section>
      </div>
    </div>
  );
} 