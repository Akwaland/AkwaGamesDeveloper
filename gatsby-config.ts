import { siteMetadata } from "./config";
import tailwindConfig from "./tailwind.config";
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import { resolve } from "path";
import { start } from "repl";

const plugins = [
    
    `gatsby-remark-copy-linked-files`,
    `gatsby-plugin-sharp`,
    `gatsby-remark-videos`,
    `gatsby-remark-images`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-typescript`,
    `gatsby-plugin-codegen`,
    {
        resolve: `gatsby-source-filesystem`,
        options: {
            name: `blog`,
            path: `${__dirname}/contents/blog/`,
        },
    },
    {
        resolve: `gatsby-source-filesystem`,
        options: {
            name: `portfolio`,
            path: `${__dirname}/contents/portfolio/`,
        },
    },
    {
        resolve: `gatsby-source-filesystem`,
        options: {
            name: `basepages`,
            path: `${__dirname}/contents/basepages`,
        },
    },

    {
        resolve: `gatsby-plugin-mdx`,
        options: {
            gatsbyRemarkPlugins: [
                {
                    resolve: `gatsby-remark-copy-linked-files`,
                    options: {},
                  },  
                  {
                    resolve: `gatsby-remark-videos`,
                    options: {
                      pipelines: [
                        {
                          name: 'vp9',
                          transcode: (chain: { videoCodec: (arg0: string) => { (): any; new(): any; noAudio: { (): { (): any; new(): any; outputOptions: { (arg0: string[]): any; new(): any; }; }; new(): any; }; }; }) =>
                            chain
                              .videoCodec('libvpx-vp9')
                              .noAudio()
                              .outputOptions(['-crf 20', '-b:v 0']),
                          maxHeight: 480,
                          maxWidth: 900,
                          fileExtension: 'webm',
                        },
                        {
                          name: 'h264',
                          transcode: (chain: { videoCodec: (arg0: string) => { (): any; new(): any; noAudio: { (): { (): any; new(): any; addOption: { (arg0: string, arg1: string): { (): any; new(): any; addOption: { (arg0: string, arg1: string): { (): any; new(): any; outputOptions: { (arg0: string[]): { (): any; new(): any; videoBitrate: { (arg0: string): any; new(): any; }; }; new(): any; }; }; new(): any; }; }; new(): any; }; }; new(): any; }; }; }) =>
                            chain
                              .videoCodec('libx264')
                              .noAudio()
                              .addOption('-profile:v', 'main')
                              .addOption('-pix_fmt', 'yuv420p')
                              .outputOptions(['-movflags faststart'])
                              .videoBitrate('1000k'),
                          maxHeight: 480,
                          maxWidth: 900,
                          fileExtension: 'mp4',
                        },
                      ],
                    }
                  },
                {
                    resolve: `gatsby-remark-images`,
                    options: {
                        maxWidth: 1200,
                      
                    },
                },

             
            ],
        },
    },
    
   { resolve:`gatsby-transformer-remark`,
     options:{},
},
    {
        resolve: `gatsby-plugin-postcss`,
        options: {
          postCssPlugins: [
            tailwindcss(tailwindConfig),
            autoprefixer,
            ...(process.env.NODE_ENV === `production`
              ? [require(`cssnano`)]
              : []),
          ],
        },
      },
]

if (siteMetadata.disqus) {
    plugins.push({
        resolve: `gatsby-plugin-disqus`,
        options: {
            shortname: siteMetadata.disqus,
        },
    } as any)
}

export default {
  siteMetadata: siteMetadata,
  plugins: plugins,
};
