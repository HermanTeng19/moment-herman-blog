import Header from '../components/Header';
import Footer from '../components/Footer';
import GameRating from '../components/GameRating';
import CombatDemo, { Skill } from '../components/CombatDemo';
import CharacterCard from '../components/CharacterCard';
import BattleReplay, { BattleScene } from '../components/BattleReplay';
import TeamSpirit, { Member } from '../components/TeamSpirit';
import GameStats, { Stat } from '../components/GameStats';

export default function TestComponentsPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 sm:px-8">
      <Header />
      
      <main>
        <section className="py-16 sm:py-24">
          <h1 className="font-serif text-4xl text-center mb-16 tracking-widest text-stone-800 dark:text-stone-200">
            组件测试页面
          </h1>
          
          <div className="space-y-12">
            {/* Game Rating Component */}
            <div>
              <h2 className="font-serif text-2xl mb-6 text-stone-800 dark:text-stone-200">游戏评分组件</h2>
              <GameRating 
                graphics={9}
                gameplay={8}
                story={9}
                music={8}
                overall={8.5}
              />
            </div>

            {/* Combat Demo Component */}
            <div>
              <h2 className="font-serif text-2xl mb-6 text-stone-800 dark:text-stone-200">战斗技能树</h2>
              <CombatDemo>
                <Skill name="七十二变" level={5} description="变化多端，难以捉摸" />
                <Skill name="筋斗云" level={4} description="腾云驾雾，瞬息千里" />
                <Skill name="火眼金睛" level={3} description="识破伪装，看透本质" />
                <Skill name="如意金箍棒" level={5} description="随心所欲，威力无穷" />
              </CombatDemo>
            </div>

            {/* Character Cards */}
            <div>
              <h2 className="font-serif text-2xl mb-6 text-stone-800 dark:text-stone-200">角色卡片</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <CharacterCard name="孙悟空" role="齐天大圣" power="七十二变" />
                <CharacterCard name="猪八戒" role="天蓬元帅" power="三十六变" />
                <CharacterCard name="沙僧" role="卷帘大将" power="流沙河" />
              </div>
            </div>

            {/* Battle Replay */}
            <div>
              <h2 className="font-serif text-2xl mb-6 text-stone-800 dark:text-stone-200">战斗回放</h2>
              <BattleReplay>
                <BattleScene 
                  boss="牛魔王" 
                  duration="15分钟" 
                  difficulty="困难" 
                  strategy="利用地形优势，寻找破绽时机"
                />
                <BattleScene 
                  boss="白骨精" 
                  duration="8分钟" 
                  difficulty="中等" 
                  strategy="识破伪装，直接攻击本体"
                />
              </BattleReplay>
            </div>

            {/* Team Spirit */}
            <div>
              <h2 className="font-serif text-2xl mb-6 text-stone-800 dark:text-stone-200">团队精神</h2>
              <TeamSpirit>
                <Member name="孙悟空" contribution="主要战斗力" />
                <Member name="猪八戒" contribution="辅助战斗" />
                <Member name="沙僧" contribution="后勤保障" />
                <Member name="唐僧" contribution="团队领导" />
              </TeamSpirit>
            </div>

            {/* Game Stats */}
            <div>
              <h2 className="font-serif text-2xl mb-6 text-stone-800 dark:text-stone-200">游戏统计</h2>
              <GameStats>
                <Stat label="游戏时长" value="120h" />
                <Stat label="完成度" value="95%" />
                <Stat label="成就数" value="42" />
                <Stat label="评分" value="9.2" />
              </GameStats>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
} 