const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function seed() {
  const email = "rachel@remix.run";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("racheliscool", 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  await prisma.note.create({
    data: {
      title: "My first note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  await prisma.note.create({
    data: {
      title: "My second note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  const posts = [
    {
      slug:  "my-first-post",
      title: "My First Post",
      markdown: `
      # What is this Post and Why Did I Write it?
      
      This is the story of how I went from never having coded in my life to employed as a full-stack developer in just over two years. This is not a self-help article about how to land your dream job at a Big-N company as quickly as possible. Nor is it another one of those ‘self-taught dev’ stories about an author who had been programming for fun since he was 10 years old, or whose uncle hired him as an intern at the company he owns. On the other side of the coin, I’m not going to tell you I was a full-time working father of four kids under the age of two. I’m not slighting those people - everyone has their own path - but I read way too many posts and articles of that nature during my journey, and all they did was discourage me and fill me with doubt. 
      
      The following is simply an account of where I started, why I started, and how I got to where I am. There were no tricks or short cuts. I’m not a genius and I've never been very good at math, and I will admit to a decent amount of luck that led to my break. Having said that, I’m a firm believer in ‘you make your own luck’. If it weren’t for my hard work and willingness to put myself out there, I would not have had the opportunities for good fortune. One of the many reasons I love the programming community is everyone’s desire to help each other and to give back to the tribe. Everyone is searching for other people like them, and the more content thats out there means a higher chance they will find something relatable. Writing this is the beginning of my attempts to give back, and if it helps just one person, then it will have been worth posting. So here is my story, take from what it what you will.
      
      # The Background (skip if you don’t care about this part)
      
      I graduated with a liberal arts degree - telling people I either wanted to be a lawyer or a teacher - but by the time I graduated, I wanted neither of those careers. I have a debilitating fear of public speaking and hate being the center of attention. So I took a job as a physical therapy aide and made slightly more than peanuts while I decided what I wanted to do for the rest of my life. Fast forward two years (because that’s what it felt like), and I was still making peanuts and had no clue what to do about improving it. I’d been making minimum payments on an oppressive amount of student loan debt so I decided grad school was out of the question. That’s when I began researching careers that did not require a specialized degree. This is how I found reddit’s [r/learnprogramming](http://reddit.com/r/learnprogramming) and [r/cscareerquestions](http://reddit.com/r/cscareerquestions), two forums that helped me tremendously and which I still visit everyday. 
      
      It is worth mentioning here that once I was out of the party-atmosphere of college for about a year, I became way more interested in applying myself to self-improvement. I was (and still am) almost obsessed with learning new things, reading, personal finance, fitness, and nutrition. I believe my new attitude and self-motivation is, above everything else, what allowed me to become a software developer without any formal, technical education.
      
      # Research Phase
      
      After extensive research about what language to learn and what resources were best for self-education, I landed on the [The Odin Project](http://theodinproject.com) (from here on out will be referenced as TOP). My research included getting to about the third chapter in *Eloquent Javascript* and giving up. I still have no idea why that’s so frequently suggested for beginners; I don’t think I’d be able to get through it even now. Many other commenters will suggest a projects-based curriculum as the best way to learn, and thus I was led to TOP. But having the resources(s) and executing your plan are two entirely different things. It took commitment to a routine, grit to persevere, and desire to reach an end goal for me to progress through TOP’s lessons and make myself employable. It took sacrifices: making money at a real job, moving out of my parents house, vacationing with friends. Just to name a few. 
      
      # My Plan
      
      Here is how I decided to execute my education plan: I cut down my hours working at the PT clinic from ~40 to ~15-20. Three days a week, I would work 6:15am-12pm (and usually a few more hours some afternoons). On days I worked, I would come home to eat lunch, then head to the library with my computer from 1 to about 5:30. On the days I did not work, I got up around 8, worked from home from around 9-12, then hit the library as usual 1-5:30. Every single night after dinner and working out, I would study for at least another hour. Sometimes several. In my opinion, the merit of TOP is that there is no monotony to the lessons. Like being a real developer, everyday is cognitively stimulating, and every lesson challenges you to consistently push your limit past what it was the day before. Each chapter increases in complexity and consists of a few resources on a topic, followed by a project with simple instructions of what to build. There are very few tutorials and almost 0 hand-holding. It is up to you to figure out how to complete the project. This is the most important skill I learned from TOP. Knowing how to figure out what you don’t know, without someone walking you through it, has been invaluable early on in my career. 
      
      Of course, there were plenty of times when I needed extra help. One of the most important features on TOP is the ’Student Solutions’ section. I’d be lying to you if I told you I didn’t peak at this section on basically every project. However, it was never a matter of copying someone else’s work. It was more like I exhausted my ideas and got stuck on a certain point, and needed to see if anyone else had a similar feature that I could implement in my project. Not to mention there is always an active chat with plenty of other students willing to lend a helping-hand.
      
      Furthermore, there were a few times I thought about giving up on my ultimate goal. Potential job opportunities outside the field of programming were offered, and I needed to think hard about my options. But I was simply enjoying myself too much to ever seriously consider doing anything else long-term. The feeling of satisfaction I’d get from building things from scratch was, and is, something that I’d never experienced before. At the risk of sounding hyperbolic, it is almost euphoric. On top of the fact that I had more than a fair share of doubters to motivate me, I was determined to reach my destination. I told myself everyday "it's not over until you give up".
      
      # Applying and the First Break
      
      After about 9 months of grinding through TOP’s curriculum, I decided to put some applications out and see what I got in response. I mostly used [AngelList](http://angel.co) to apply to startups in my area, and to my surprise, actually got a few phone screens right away. But this initial round of applying made me realize I was not yet ready for taking on an entry-level position. I needed to beef up my portfolio, adjust my resume, and learn how to sell myself. So that is what I did. I worked on completing more of TOP (including a clone of Facebook using Ruby on Rails), contributed to an open-source project*, and made a personal website to show off my projects. But it still took another four months before I received what I consider to be the first lucky break of my journey.
      
      ~Sixteen months after I started learning, and ~five months after I started applying, I got a response from a startup on AngelList that said they wanted me to come in to meet the founders. My first in-person interview! As nervous as I was, I met the two guys - who were younger than I was - for a very informal conversation, and they offered me the position on the spot. While I was over-the-moon about this stroke of luck, it was only a part-time, unpaid internship. Without it though, I would not be where I am now. The company consisted of a recent college graduate who had developed a personal project being used by a few thousand high schoolers, and his co-founder (still in college) who wrote the content for the application. They wanted to hire a team of junior-level programmers to help them scale the product for growth. Without getting into the flaws of this plan, I will say that I worked harder in those first few weeks than ever before to learn the new technology (React/Redux), and this work ethic is the same I used at the next job, and which I will use in every position in my career.
      
      *TOP was undergoing a site makeover, and asked for help contributing lessons to their new curriculum
      
      # The End of the Beginning: My Second Break
      
      Once my grand delusions of getting in at the ground level of a billion-dollar company faded, it was time to start looking for a real, salaried job. Seven months had gone by, I knew the train was losing steam, and it was time to put myself back on the market. This time around, I was getting way more interest from my applications. Several phone screens with CTOs and hiring managers went so well I was sure I’d get a call back. My experience on an actual team, building production code made for more confident conversations and I felt like I belonged at the companies I was speaking to. Alas, it was not until closer to 10 months at this company that I was hit with another stroke of luck. A rapidly growing startup invited me in for an interview with their CTO after a decent phone conversation with a hiring manager. My second in-person interview! Here is how I won over the CTO, then the CEO and COO, and landed my first official dev job:
      
      # Interviewing and Where I am Now
      
      At this point, I had done enough research and preparation for interviewing that I felt pretty confident with myself. This isn't to say I wasn't cripplingly nervous, as I am a nervous person by nature, and the impostor syndrome of being self-taught is nearly debilitating. But I sucked it up and walked into the office shakily asking for the CTO by name. 
      
      When you picture in your head a lifelong, passionate and opinionated programmer, that is the person who I met. Thus, right off the bat I was extremely intimidated by this guy who spoke computer science seemingly as his first language. But I let him do the talking, asking constantly about the company's goals, his personal background and future plans. He asked me one general javascript question, pertaining to scope, that I answered correctly (big phew). To conclude, he told me to send him some of my code on a personal project so he could get an idea of my experience level. This was the turning point. I whipped out my laptop on the spot and showed him a simple game I created the day before as a practice in React and Redux. He quickly scanned through the files, almost gagging at the Redux practices. He asked why constants were defined as strings and declared in their own separate file, to which I replied it was simply a Redux convention. While he disagreed with the reasoning, he was impressed with the project and told me he'd let me know about a second interview later in the week.
      
      As soon as I got back into my office, I researched Redux conventions and sent him a StackOverflow post arguing for the necessity of action constant declarations. Within an hour, I received a ~500 word response, and an offer for a second interview later that week. To this day, he tells me that that email is the reason I got the job. 
      
      There is not much to say about the second interview. We started with a whiteboard question. Though nervous, the CTO was so on my side to begin with, that with his help, I was able to reason out a solution fairly seemlessly. From there, it was more-or-less him excitedly telling the CEO and COO about me, and them selling me on the company. The next day the CEO called me with a formal offer. From first phone interview to offer, the process took 11 days, and felt even shorter. About 25 months after I began my "self-education", I started work as a full-time, full-stack software developer.
      
      # Final thoughts
      
      If you're still reading this, I appreciate your patience and hope you found something to take away from it. I will conclude with my takeaways having lived the experience. 
      
      I've mentioned luck numerous times, and feel I should elaborate on what I mean. Call it impostor syndrome or lack of confidence, but I still don't feel like I was prepared for either offer I received. The first I think the founders were just hiring whoever was willing to work for free, and it turned out to be a learning experience I will cherish for the rest of my life. The second was a CTO who specifically wanted a green, self-taught and self-motivated individual to mentor. He wasn't interested in education or resumes, and our goals aligned perfectly. I told him the day we met and I still tell him weekly that I could not design a more perfect first full-time job in the industry. 
      
      Both of these situations seem like cases of "right place, right time", but neither would have happened if I wasn't willing, despite my uncertainty, to put myself out there and risk being rejected. To take it one step further, I wouldn't have been in the position to put myself out there if I didn't convince myself the sacrifice was worth it, and commit myself to the process. Once I figured out what I wanted, I lived, ate, and breathed code. My personal mantra through those months grinding in the library and taking home barely enough money to feed myself was "it isn't over until you give up". As long as you keep pushing everyday, or however often you can afford to, eventually you will make it to the end goal. Only when you decide to give up, will the dream be over. It's easy to get discouraged reading about people who get offers for $100k+/year after 6 months, but everyone's path is different, and you should only compare yourself to *yourself* the day/week/month before. It takes hard work and a little luck, and patience to get to your first break. But remember it's not over until you give up.
      
      Good luck and thanks for reading!
      
      # Some Useful Resources
      
      [r/learnprogramming](http://reddit.com/r/learnprogramming)  
      [r/cscareerquestions](http://reddit.com/r/cscareerquestions)  
      [The Odin Project](http://theodinproject.com)  
      [AngelList](http://angel.co)  
      [Pomodoro timer](https://tomato-timer.com/)  
      [Deep Work](https://www.goodreads.com/book/show/25744928-deep-work)`
      .trim()
    },
    {
      slug:  "my-second-post",
      title: "My Second Post",
      markdown: `
# Using Native Modules to Keep Users Logged In

Let's say you're re-writing your iOS application in React Native and pushing the update live in a few days. In order to keep users logged in, each codebase checks for a session stored in their individual local storage system. iOS uses NSUserDefaults and React Native uses AsyncStorage. However, when a user downloads the update, nothing is going to be stored in AsyncStorage. Thus, they will be forced to log back in - not an ideal user experience.

Fortunately, React Native has a built-in way to communicate with iOS/Android native code. I will start with iOS. Though intimidating at first, it is a fairly simple process. Here is what we will need:

- A bridge from the iOS codebase in Objective-C
- A way to access that bridge in React Native

# Objective-C

Read the [Native Module Docs](https://facebook.github.io/react-native/docs/native-modules-ios) to skip this paragraph. In my example, my header file will be named UserToken, and it will import and extend the RCTBridgeModule to expose the class we need. 

    // UserToken.h
    #import <React/RCTBridgeModule.h>

    @interface UserToken : NSObject <RCTBridgeModule>
    
    - (void) getToken;
    
    @end

My implementation file will expose the class using \`RCT_EXPORT_MODULE()\` and the method I will be referencing using \`RCT_REMAP_METHOD()\`. This method will take the string supplied within React Native, and return a promise that will resolve with the value associated with that key from NSUserDefaults. \`RCT_REMAP_METHOD()\` will take four arguments:

- the name of the method
- the parameter supplied to that method, in our case the name of the token as stored in NSUserDefaults
- the resolver that will resolve the promise and return the token from NSUserDefaults
- and the rejecter of the promise.

The method takes a string as a parameter, in case there are other tokens stored in iOS that the React Native app needs. I'm presenting it this way because, in my case, I needed to be able to declare the name of the iOS token in the React Native code. 

    // UserToken.m
    #import "UserToken.h"

    @implementation UserTokens

        RCT_EXPORT_MODULE();

        RCT_REMAP_METHOD(getToken,
                        tokenRequest: (NSString *)tokenRequest
                        resolver: (RCTPromiseResolveBlock)resolve
                        rejecter: (RCTPromiseRejectBlock)reject)
        {
        
            if (tokenRequest) {
                NSString *tokenResponse = [[NSUserDefaults standardUserDefaults] objectForKey:tokenRequest];

                resolve(tokenResponse);
            } else {
                NSError *error = @"error";
                reject(@"no_events", @"There were no events", error);
            }
        }

    @end

# React Native

Now that the iOS code is exposed using the RCTBridgeModule, we can access it in the React Native codebase. It is as simple as importing the module.

    import { NativeModules } from 'react-native'
    const iosTokens = NativeModules.UserToken;

    function appUpdateSession() {
        if ( Platform.OS === 'ios' ) {
            return iosTokens.getToken('session_token').then((sessionToken) => {
                console.log(sessionToken)
            }
        }
    }

If your user is logged in on iOS, and downloads the app update to React Native, this code will log their session token that was stored in NSUserDefaults. You can use this value to prevent them from being logged out!
          `.trim(),
    }
  ]

  for (const post of posts) {
    console.log('post?', post)
    await prisma.post.upsert({
      where: {slug: post.slug},
      update: post,
      create: post
    });
  }

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
