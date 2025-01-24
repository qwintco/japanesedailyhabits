'use client'

import React, { useMemo, useState, useEffect } from 'react';
import Head from 'next/head';
import { Search, Sparkles } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"

// Full habits data array
const habits = [
  {
    id: 1,
    title: 'Ichigo Ichie (一期一会)',
    description: 'Treasure every moment as if it were once-in-a-lifetime.',
    longDescription: 'This concept reminds us to cherish each moment as unique and special, never to be repeated. It teaches mindfulness and appreciation of the present moment, originating from Japanese tea ceremonies.',
    implementation: [
      'Start each morning by taking 2 minutes to appreciate the uniqueness of the day',
      'Practice active listening in conversations, giving full attention without planning responses',
      'Take photos or journal about daily moments you want to remember',
      'During meals, focus entirely on the experience of eating without distractions',
      'Create small rituals for regular activities (like making coffee) to make them special'
    ],
    category: 'Mindfulness',
  },
  {
    id: 2,
    title: 'Kaizen (改善)',
    description: 'Practice continuous improvement in small steps.',
    longDescription: 'The philosophy of making small, continuous improvements rather than major changes. This approach can be applied to personal development, work, and daily routines.',
    implementation: [
      'Identify one small improvement you can make to your daily routine each week',
      'Keep a "improvements journal" to track tiny changes and their impacts',
      'Set 5-minute goals for new habits you want to build',
      'Review your progress monthly and adjust your approach',
      'Focus on 1% improvements rather than dramatic changes'
    ],
    category: 'Self-improvement',
  },
  {
    id: 3,
    title: 'Shinrinyoku (森林浴)',
    description: 'Forest bathing - spend time in nature.',
    longDescription: 'The practice of spending time in forests to reduce stress and improve overall well-being. Research shows it can lower blood pressure and boost immune system function.',
    implementation: [
      'Schedule weekly 20-minute walks in a nearby park or wooded area',
      'Practice deep breathing exercises while outdoors',
      'Leave your phone behind or on silent during nature time',
      'Use all five senses to observe your natural surroundings',
      'Try different natural locations to find your favorite spots'
    ],
    category: 'Health',
  },
  {
    id: 4,
    title: 'Wabi-Sabi (侘寂)',
    description: 'Find beauty in imperfection and simplicity.',
    longDescription: 'An aesthetic centered on the acceptance of transience and imperfection. This principle teaches us to appreciate the beauty in simple, rustic, and imperfect things.',
    implementation: [
      'Display imperfect natural objects in your home',
      'Embrace the aging process of objects rather than replacing them',
      'Practice acceptance of your own imperfections',
      'Choose handmade items over mass-produced when possible',
      'Find beauty in everyday worn or weathered items'
    ],
    category: 'Mindfulness',
  },
  {
    id: 5,
    title: 'Hara Hachi Bu (腹八分)',
    description: 'Eat until you are 80% full.',
    longDescription: 'A dietary practice from Okinawa that involves eating until you feel about 80% full. This helps prevent overeating and promotes better digestion and longevity.',
    implementation: [
      'Use smaller plates and bowls for portion control',
      'Eat slowly and pause between bites',
      'Rate your fullness on a scale of 1-10 during meals',
      'Wait 20 minutes before deciding on seconds',
      'Practice mindful eating at each meal'
    ],
    category: 'Health',
  },
  {
    id: 6,
    title: 'Gaman (我慢)',
    description: 'Practice patience and perseverance.',
    longDescription: 'The virtue of enduring difficulties with patience and dignity. This principle helps develop resilience and emotional stability in challenging situations.',
    implementation: [
      'When facing difficulties, pause and take three deep breaths before responding',
      'Keep a "patience journal" to track challenging situations and how you handled them',
      'Practice delayed gratification by waiting 24 hours before making non-essential purchases',
      'When stuck in traffic or lines, use the time for mindfulness rather than frustration',
      'Set small challenges for yourself and complete them without complaint'
    ],
    category: 'Self-improvement',
  },
  {
    id: 7,
    title: 'Osoji (お掃除)',
    description: 'Regular deep cleaning of living spaces.',
    longDescription: 'The practice of thorough cleaning, typically done at the end of the year. It represents both physical cleaning and spiritual renewal.',
    implementation: [
      'Schedule monthly deep-cleaning sessions for different areas of your living space',
      'Create a cleaning checklist that includes often-forgotten areas like light fixtures',
      'Combine cleaning with decluttering by removing one unused item during each session',
      'Make cleaning meditative by focusing fully on each action without rushing',
      'End each day by returning everything to its designated place'
    ],
    category: 'Lifestyle',
  },
  {
    id: 8,
    title: 'Shisa Kanko (指差喚呼)',
    description: 'Point-and-call safety method.',
    longDescription: 'A method of preventing mistakes by pointing at important things and calling out confirmations. This increases attention and reduces errors in daily tasks.',
    implementation: [
      'Point and verbally confirm important items before leaving home (keys, wallet, phone)',
      'When checking important documents, point to each item while reading it aloud',
      'Use this method when taking medication to verify type and dosage',
      'Apply this technique when following recipes to ensure no steps are missed',
      'Practice point-and-call when doing safety checks in potentially dangerous situations',
    ],
    category: 'Productivity',
  },
  {
    id: 9,
    title: 'Ikigai (生き甲斐)',
    description: 'Find your purpose in life.',
    longDescription: 'The concept of finding purpose in life through the intersection of what you love, what youre good at, what the world needs, and what you can be paid for.',
    implementation: [
      'List your skills, passions, and values to identify overlap areas',
    'Spend 15 minutes each morning writing about what energizes you',
    'Try new activities monthly to discover what brings you joy and fulfillment',
    'Connect with people who share your interests and learn from their experiences',
    'Regularly evaluate how your daily activities align with your sense of purpose'
    ],
    category: 'Self-improvement',
  },
  {
    id: 10,
    title: 'Ocha (お茶)',
    description: 'Regular tea drinking ritual.',
    longDescription: 'The practice of drinking green tea throughout the day. Green tea is rich in antioxidants and promotes relaxation and mindfulness.',
    implementation: [
      'Create a dedicated space for tea preparation and drinking',
      'Set specific times during the day for mindful tea breaks',
      'Learn about different tea varieties and their proper preparation methods',
      'Use tea time as a moment for reflection or peaceful conversation',
      'Practice being present with each sip, noting the teas temperature and flavor',
    ],
    category: 'Health',
  },
  {
    id: 11,
    title: 'Hansei (反省)',
    description: 'Self-reflection practice.',
    longDescription: 'Regular self-reflection to acknowledge mistakes and areas for improvement. This practice promotes personal growth and learning from experience.',
    implementation: [
      'End each day with 10 minutes of written self-reflection',
      'After completing projects, document three things you learned and three areas for improvement',
      'Schedule weekly review sessions to assess personal growth and challenges',
      'Share reflections with a trusted friend or mentor monthly for outside perspective',
      'Keep a "lessons learned" journal to track patterns and progress'
    ],
    category: 'Self-improvement',
  },
  {
    id: 12,
    title: 'Kintsugi (金継ぎ)',
    description: 'Embrace and repair what is broken.',
    longDescription: 'The art of repairing broken pottery with gold, teaching that breaks and repairs are part of history, not something to hide.',
    implementation: [
      'When something breaks, consider creative ways to repair it beautifully',
      'Document the story behind repaired items to celebrate their history',
      'Learn basic repair skills for common household items',
      'View personal setbacks as opportunities for growth and transformation',
      'Share repair stories to inspire others to see beauty in imperfection'
    ],
    category: 'Mindfulness',
  },
  {
    id: 13,
    title: 'Shuhari (守破離)',
    description: 'Three stages of mastery.',
    longDescription: 'A concept describing the stages of learning: first following the rules, then breaking them, and finally transcending them.',
    implementation: [
      'Master the fundamentals of a new skill before experimenting',
      'Document your learning journey from basics to innovation',
      'Practice one technique perfectly before moving to variations',
      'Teach others to deepen your own understanding',
      'Regular self-assessment to identify your current learning stage'
    ],
    category: 'Self-improvement',
  },
  {
    id: 14,
    title: 'Mottainai (もったいない)',
    description: 'Avoid waste in daily life.',
    longDescription: 'A sense of regret concerning waste, encouraging people to use things fully and be mindful of their environmental impact.',
    implementation: [
      'Plan meals in advance to minimize food waste',
      'Keep a log of unused items to improve future purchasing decisions',
      'Find creative ways to repurpose items before discarding them',
      'Learn proper maintenance of belongings to extend their life',
      'Practice using every part of ingredients when cooking'
    ],
    category: 'Lifestyle',
  },
  {
    id: 15,
    title: 'Genkan (玄関)',
    description: 'Maintain a clean entrance.',
    longDescription: 'The practice of having a dedicated entrance area where outdoor shoes are removed, keeping living spaces clean and creating a boundary between outside and inside.',
    implementation: [
      'Create a welcoming entrance ritual with proper storage for shoes',
      'Clean the entrance area daily to maintain its freshness',
      'Place indoor slippers neatly for easy transition',
      'Add plants or artwork to make the entrance inviting',
      'Maintain seasonal items (umbrella stand, boot tray) as needed'
    ],
    category: 'Lifestyle',
  },
  {
    id: 16,
    title: 'Ma (間)',
    description: 'Appreciate space and pause.',
    longDescription: 'The conscious appreciation of negative space and silence in life, art, and communication.',
    implementation: [
      'Create intentional empty spaces in your living environment',
      'Practice comfortable silence in conversations',
      'Add pauses between activities instead of rushing',
      'Leave white space in your calendar for spontaneity',
      'Take monthly digital detox days for quiet reflection'
    ],
    category: 'Mindfulness',
  },
  {
    id: 17,
    title: 'Nemawashi (根回し)',
    description: 'Lay groundwork before decisions.',
    longDescription: 'The practice of quietly laying the foundation for a project or change by speaking with stakeholders and gathering support.',
    implementation: [
      'Before big decisions, privately consult all stakeholders',
      'Create relationship maps for projects to identify key influencers',
      'Maintain regular check-ins with team members to build trust',
      'Document and address concerns early in the planning process',
      'Build consensus through informal conversations before formal meetings'
    ],
    category: 'Productivity',
  },
  {
    id: 18,
    title: 'Shoganai (しょうがない)',
    description: 'Accept what cannot be changed.',
    longDescription: 'The acceptance of things beyond one\'s control, helping to reduce stress and anxiety about unchangeable situations.',
    implementation: [
      'List situations into "can control" and "cannot control" categories',
      'Practice letting go of perfect outcomes through mindfulness',
      'Redirect energy from worry to constructive action',
      'Share acceptance stories with others facing similar challenges',
      'Develop backup plans for various scenarios to reduce anxiety'
    ],
    category: 'Mindfulness',
  },
  {
    id: 19,
    title: 'Danjiki (断食)',
    description: 'Periodic fasting for health.',
    longDescription: 'The practice of occasional fasting for physical and spiritual cleansing, often integrated with meditation.',
    implementation: [
      'Start with simple 12-hour fasting windows overnight',
      'Use fasting times for meditation and reflection',
      'Keep a journal of physical and mental effects during fasts',
      'Gradually extend fasting periods while monitoring wellbeing',
      'Combine fasting with gentle movement like walking or stretching'
    ],
    category: 'Health',
  },
  {
    id: 20,
    title: 'Yuimaru (ゆいまーる)',
    description: 'Community cooperation spirit.',
    longDescription: 'The spirit of mutual help and cooperation within a community, emphasizing the importance of social bonds.',
    implementation: [
      'Participate in regular community service activities',
      'Organize skill-sharing sessions with neighbors',
      'Create a community resource-sharing system',
      'Check on elderly or vulnerable community members regularly',
      'Initiate community projects that benefit everyone'
    ],
    category: 'Lifestyle',
  },



  // Continue with remaining habits...
  {
    id: 50,
    title: 'Kenshō (見性)',
    description: 'Seek direct insight.',
    longDescription: 'The practice of seeking direct insight into the nature of things through personal experience rather than accepting others\' views.',
    implementation: [
      'Question your assumptions about daily situations',
      'Try new experiences with an open mind',
      'Journal about your personal insights and revelations',
      'Practice meditation to develop clarity',
      'Engage in self-reflection without judgment'
    ],
    category: 'Self-improvement',
  },
];

export default function JapaneseHabits() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [habitOfTheDay, setHabitOfTheDay] = useState(null);

  useEffect(() => {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    const habitIndex = dayOfYear % habits.length;
    setHabitOfTheDay(habits[habitIndex]);
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(habits.map(habit => habit.category))];
    return uniqueCategories.sort();
  }, []);

  const filteredHabits = useMemo(() => {
    return habits.filter(habit => {
      const matchesCategory = selectedCategory === 'All' || habit.category === selectedCategory;
      const matchesSearch = habit.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           habit.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  return (
    <>
      <Head>
        <title>Japanese Daily Habits & Wellness Practices | Mindful Living Guide</title>
        <meta name="description" content="Discover authentic Japanese daily habits and wellness practices for a balanced life. Learn mindfulness techniques, healthy living routines, and cultural practices for personal growth." />
        <meta name="keywords" content="Japanese daily habits, wellness practices, mindfulness, self-improvement" />
        <meta property="og:title" content="Japanese Daily Habits & Wellness Practices" />
        <meta property="og:description" content="Transform your life with authentic Japanese wellness rituals and mindfulness practices." />
        <meta property="og:type" content="website" />
      </Head>

      <div className="min-h-screen bg-gray-50 p-6">
        <main className="max-w-7xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900">Japanese Daily Habits & Wellness Practices</h1>
            <p className="mt-4 text-xl text-gray-600">Discover authentic Japanese wellness rituals and cultural practices for a balanced, mindful life</p>
          </header>

          {habitOfTheDay && (
            <section aria-label="Featured Japanese practice of the day">
              <Card className="mb-8 bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
                <CardContent className="py-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="h-5 w-5 text-blue-600" />
                        <span className="text-sm font-medium text-blue-900">Todays Featured Japanese Practice</span>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-gray-900">{habitOfTheDay.title}</h3>
                        <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                          {habitOfTheDay.category}
                        </span>
                        <p className="text-gray-600 text-lg leading-relaxed">{habitOfTheDay.description}</p>
                      </div>
                    </div>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="bg-blue-200 text-blue-800 hover:bg-blue-300 hover:text-blue-900">
                          Learn More
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>{habitOfTheDay.title}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <p className="text-gray-600">{habitOfTheDay.longDescription}</p>
                          <div>
                            <h4 className="font-semibold mb-2">Implementation Guide:</h4>
                            <ul className="list-disc pl-4 space-y-2">
                              {habitOfTheDay.implementation.map((step, index) => (
                                <li key={index} className="text-gray-600">{step}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            </section>
          )}

          <section aria-label="Search and filter Japanese practices" className="mb-8 space-y-4">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="relative flex-grow max-w-xs">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search Japanese practices..."
                  className="pl-10 pr-4 py-2 w-full border rounded-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="Search practices"
                />
              </div>
              
              <select
                className="border rounded-lg px-4 py-2"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                aria-label="Filter by category"
              >
                <option value="All">All Japanese Practices</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    Japanese {category} Practices
                  </option>
                ))}
              </select>
            </div>
          </section>

          <section aria-label="Japanese wellness practices collection">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHabits.map((habit) => (
                <article key={habit.id} className="h-full">
                  <Card className="h-full">
                    <CardHeader>
                      <div className="space-y-1">
                        <h3 className="text-xl font-semibold">{habit.title}</h3>
                        <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                          Japanese {habit.category} Practice
                        </span>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <p className="text-gray-600">{habit.description}</p>
                    </CardContent>

                    <CardFooter className="mt-auto">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="w-full">
                            Learn More
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>{habit.title}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <p className="text-gray-600">{habit.longDescription}</p>
                            <div>
                              <h4 className="font-semibold mb-2">Implementation Guide:</h4>
                              <ul className="list-disc pl-4 space-y-2">
                                {habit.implementation.map((step, index) => (
                                  <li key={index} className="text-gray-600">{step}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </CardFooter>
                  </Card>
                </article>
              ))}
            </div>

            {filteredHabits.length === 0 && (
              <p className="text-center text-gray-500 mt-8">
                No Japanese wellness practices found matching your search criteria
              </p>
            )}
          </section>

          <footer className="mt-12 text-center text-gray-600">
            <p>Explore authentic Japanese wellness rituals and daily habits for a more balanced, mindful life</p>
          </footer>
        </main>
      </div>
    </>
  );
}