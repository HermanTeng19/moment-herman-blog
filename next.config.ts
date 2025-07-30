import createMDX from '@next/mdx';
import type { NextConfig } from "next";

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'md', 'ts', 'tsx'],
};

export default withMDX(nextConfig);
