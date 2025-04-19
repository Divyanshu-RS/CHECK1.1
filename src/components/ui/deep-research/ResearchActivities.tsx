'use client'
import { useDeepResearchStore } from '@/store/deepResearch'
import React, { useState } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from '../button'
import { ChevronDown } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {format} from "date-fns"
import Link from 'next/link'

const ResearchActivities = () => {
const {activities, sources} = useDeepResearchStore();
const [isOpen, setIsOpen] = useState(true)

if (activities.length === 0) return;

  return (
    <div className='w-[90vw] sm:w-[400px] fixed top-4 right-4 z-20'>
<Collapsible className='w-full' open={isOpen} onOpenChange={setIsOpen}>
<div className="flex justify-end mb-2">
          <CollapsibleTrigger asChild>
            <Button variant="outline" size="sm" className="w-9 p-0">
              <ChevronDown className={`h-4 w-4 ${isOpen ? 'rotate-180' : ''}`} />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
  <CollapsibleContent className='h-[50vh]'>
  <Tabs defaultValue="activities" className="w-full h-full shadow-md">
  <TabsList className='w-full px-2 py-6'>
    <TabsTrigger value="activities" className='flex-1 shadow-none border-black/10 border-solid'>Activities</TabsTrigger>
    {
      sources.length > 0 && <TabsTrigger value="sources">Sources</TabsTrigger>
    }
  </TabsList>
  <TabsContent value="activities" className='h-[calc(100%-60px)] overflow-y-auto border-black/10 border-solid shadow-none bg-white/60 backdrop-blur-sm border rounded-xl '>
    <ul className='space-y-4 p-4'>
      {
        activities.map((activity, index) => <li key={index} className='flex flex-col gap-2 border-b p-2 text-sm'>
          <div className='flex items-center gap-2'>
            <span className={`
               ${activity.status === 'complete' ? "bg-green-500" : 
                activity.status === 'error' ? "bg-red-500" : "bg-yellow-500"
               } min-w-2 min-h-2 h-2 block rounded-full
              `}>
              &nbsp;
            </span>

            <p>
              {activity.message.includes("https://") ? activity.message.split("https://")[0] + 
              activity.message.split("https://")[1].split("/")[0] : activity.message
            }
            </p>
          </div>
          {
activity.timestamp && 
<span className='text-xs text-muted-foreground'>
{format(activity.timestamp, 'HH:mm:ss')}
</span>
          }
        </li>
         )
      }
    </ul>
  </TabsContent>
  {
    sources.length > 0 &&

    <TabsContent value="sources" className='h-[calc(100%-60px)] overflow-y-auto shadow-none bg-white/60 backdrop-blur-sm border rounded-xl border-black/10 border-solid'>
         <ul className='space-y-4 p-4'>
          {
            sources.map((source, index) => {
              return <li key={index} className='flex flex-col gap-2 border-b p-2'>
                <Link href={source.url} target='_blank' className='text-sm text-blue-600 hover:underline'>
                {source.title}
                </Link>
                
              </li>
            })
          }
         </ul>
  </TabsContent>
  }
</Tabs>
  </CollapsibleContent>
</Collapsible>

    </div>
  )
}

export default ResearchActivities