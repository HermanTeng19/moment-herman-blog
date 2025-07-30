import { MDXRemote } from 'next-mdx-remote/rsc';
import MDXComponents from '../components/MDXComponents';

const testMDX = `
# 测试MDX组件

这是一个测试页面，用于验证MDX组件是否正常工作。

## 游戏评分组件

<GameRating 
  graphics={9.5}
  gameplay={9.0}
  story={8.5}
  music={9.0}
  overall={9.0}
/>

## 战斗技能树

<CombatDemo>
  <Skill name="定海神针" level={5} description="基础攻击技能，可升级为群体攻击" />
  <Skill name="筋斗云" level={3} description="快速移动技能，消耗法力值" />
</CombatDemo>

## 角色卡片

<CharacterCard name="孙悟空" role="主角" power="齐天大圣" />

## 战斗回放

<BattleReplay>
  <BattleScene 
    boss="牛魔王"
    duration="8:32"
    difficulty="困难"
    strategy="利用七十二变躲避攻击，寻找破绽反击"
  />
</BattleReplay>

## 团队精神

<TeamSpirit>
  <Member name="悟空" contribution="战斗主力" />
  <Member name="唐僧" contribution="精神领袖" />
</TeamSpirit>

## 游戏统计

<GameStats>
  <Stat label="游戏时长" value="68小时" />
  <Stat label="完成度" value="92%" />
</GameStats>
`;

export default function TestMDX() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">MDX组件测试</h1>
      
      <div className="prose prose-stone max-w-none lg:prose-lg text-stone-700 leading-relaxed">
        <MDXRemote 
          source={testMDX} 
          components={MDXComponents}
        />
      </div>
    </div>
  );
} 