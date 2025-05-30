"use client";

import { AgentSummary } from "@/app/types/agent";
import { AIDA_AGENTS_SLUGS, AIDA_COMING_SOON_AGENTS, AIDA_SPECIAL_AGENTS_SLUGS } from "@/lib/config";
import { ArrowUpRight } from "@phosphor-icons/react";
import { useMemo, useState } from "react";
import { DialogAgent } from "./dialog-agent";

type AgentsPageProps = {
  agents: AgentSummary[];
};

export function AgentsPage({ agents }: AgentsPageProps) {
  const [openAgentId, setOpenAgentId] = useState<string | null>(null);

  const randomAgents = useMemo(() => {
    return agents
      .filter((agent) => agent.id !== openAgentId)
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);
  }, [agents, openAgentId]);

  const handleAgentClick = (agentId: string) => {
    setOpenAgentId(agentId);
  };

  const researchAgent = agents.find((agent) => agent.slug === "aida-advanced-research");
  const featuredAgents = agents.filter((agent) =>
    AIDA_AGENTS_SLUGS.includes(agent.slug)
  );

  return (
    <div className="bg-background min-h-screen px-4 pt-20 pb-20 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <h1 className="text-foreground text-sm font-medium">AIDA Assistants</h1>
          <div className="text-foreground mx-auto my-4 max-w-2xl text-3xl font-medium tracking-tight md:text-5xl">
            Your University AI Support
          </div>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            A collection of AI assistants tailored for academic success, campus navigation, and university administration.
          </p>
        </div>

        {researchAgent && (
          <div className="mt-12">
            <h2 className="text-foreground mb-1 text-lg font-medium">
              Advanced Research
            </h2>
            <DialogAgent
              key={researchAgent.id}
              id={researchAgent.id}
              slug={researchAgent.slug}
              name={researchAgent.name}
              description={researchAgent.description}
              avatar_url={researchAgent.avatar_url}
              example_inputs={researchAgent.example_inputs || []}
              creator_id={researchAgent.creator_id || "AIDA"}
              isAvailable={true}
              agents={agents}
              onAgentClick={handleAgentClick}
              isOpen={openAgentId === researchAgent.id}
              onOpenChange={(open) =>
                setOpenAgentId(open ? researchAgent.id : null)
              }
              randomAgents={randomAgents}
              trigger={
                <div className="group w-full items-end justify-start cursor-pointer">
                  <div className="relative min-h-[140px] w-full overflow-hidden rounded-2xl shadow-lg md:aspect-[4/1]">
                    <div className="absolute inset-0">
                      <img
                        src="/banner_library.jpg"
                        alt="Library background"
                        className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent dark:from-black/70 dark:via-black/20" />
                    <div className="relative flex h-full min-h-[140px] flex-col p-5">
                      <div className="mt-auto flex flex-row items-end justify-between gap-2">
                        <div className="flex flex-col items-start gap-0.5 text-left">
                          <h3 className="text-2xl leading-tight font-medium text-white">
                            AIDA Advanced Research
                          </h3>
                          <p className="text-sm text-white/80">
                            Conducts in-depth academic analysis, summarizes research, and explores scholarly topics with precision.
                          </p>
                        </div>
                        <div className="rounded-full bg-white/20 p-2 backdrop-blur-sm">
                          <ArrowUpRight className="h-4 w-4 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              }
            />
          </div>
        )}

        <div className="mt-12">
          <h2 className="text-foreground mb-1 text-lg font-medium">Featured Assistants</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {featuredAgents.map((agent) => (
              <DialogAgent
                key={agent.id}
                id={agent.id}
                slug={agent.slug}
                name={agent.name}
                description={agent.description}
                avatar_url={agent.avatar_url}
                example_inputs={agent.example_inputs || []}
                creator_id={agent.creator_id || "AIDA"}
                isAvailable={true}
                agents={agents}
                onAgentClick={handleAgentClick}
                isOpen={openAgentId === agent.id}
                onOpenChange={(open) => setOpenAgentId(open ? agent.id : null)}
                randomAgents={randomAgents}
              />
            ))}
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-foreground mb-1 text-lg font-medium">Coming Soon</h2>
          <div className="relative grid gap-4 md:grid-cols-2">
            {AIDA_COMING_SOON_AGENTS.slice(0, 4).map((agent) => (
              <DialogAgent
                key={agent.id}
                id={agent.id}
                name={agent.name}
                description={agent.description}
                avatar_url={agent?.avatar_url}
                example_inputs={agent.example_inputs || []}
                creator_id={agent.creator_id || "AIDA"}
                slug={agent.slug}
                isAvailable={false}
                agents={agents}
                className="pointer-events-none opacity-50 select-none"
                onAgentClick={handleAgentClick}
                isOpen={openAgentId === agent.id}
                onOpenChange={(open) => setOpenAgentId(open ? agent.id : null)}
                randomAgents={randomAgents}
              />
            ))}
            <div className="from-background absolute -inset-x-2.5 bottom-0 h-[50%] bg-gradient-to-t to-transparent sm:h-[75%]" />
          </div>
        </div>
      </div>
    </div>
  );
}