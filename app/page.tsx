"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Linkedin} from "lucide-react"

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.5 } }
}

const slideIn = {
  hidden: { x: 20, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
  exit: { x: -20, opacity: 0, transition: { duration: 0.5 } }
}

const XLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const MediumLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
  </svg>
)

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState("about")

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          subject: formData.get('subject'),
          message: formData.get('message')
        })
      });
  
      if (res.ok) {
        alert('Message sent successfully!');
        form.reset();
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      alert('Failed to send message. Please try again.');
    }
    
    setIsSubmitting(false);
  };

  const aiMlProjects = [
    {
      title: "CNN Training in C",
      description: "Developed a C-based framework for Convolutional Neural Network training with He-initialized weights,ReLU activation, maxpooling, fully connected layer, and Softmax for accuracy assessment using Categorical Cross-Entropy Loss. The accuracy achieved is comparable to Keras in both MNIST and CIFAR-10.",
      technologies: ["C", "Machine Learning", "TensorFlow", "CNN"],
      link: "https://github.com/gflengas/CNN-Training-in-C"
    },
    // {
    //   title: "End-to-End ML project",
    //   description: "",
    //   technologies: ["Python", "NLTK", "GPT-3", "Flask"],
    //   link: "https://medium.com/@yourusername/building-an-nlp-chatbot"
    // },
    // {
    //   title: "Local host chatGPT alternative",
    //   description: "",
    //   technologies: ["Python", "PyTorch", "OpenAI Gym", "DQN"],
    //   link: "https://github.com/yourusername/rl-game-ai"
    // },
    {
      title: "Genetic-Algorithm-for-WHPP",
      description: "An algorithm based on the Genetic Algorithm was implemented with Java, which solves the problem of scheduling the staff of a company- organization.",
      technologies: ["Java", "AI", "Bio-Inspired algorithms"],
      link: "https://github.com/gflengas/Genetic-Algorithm-for-WHPP"
    },
    {
      title: "AgentBD",
      description: "An agent designed to compete in the internal ANAC Repeated Multilateral Negotiations at TUC, focusing on creating automated systems that negotiate with multiple parties across various scenarios. The agent aims to optimize outcomes by adapting strategies through repeated rounds of negotiation in complex, dynamic environments.",
      technologies: ["Java", "Game Theory", "Multi-agent Systems"],
      link: "https://github.com/gflengas/AgentBD"
    }
  ]

  const hardwareProjects = [
    {
      title: "Wireless Weather Station with Web Interface",
      description: "Developed an IoT system using ESP32-S2 and Orange Pi 3 to monitor and log temperature, humidity, pressure, and light data, displayed in real-time via a Flask web interface for easy access.",
      technologies: ["Python", "C++", "ESP32", "Orange Pi", "WiFi", "IoT" ],
      link: "https://github.com/gflengas/Wireless-Weather-Station-with-Web-Interface"
    },
    {
      title: "Othello game using ATMega16",
      description: "This is a classic Othello game implemented to work with AtMega16 using STK 500 and a 10 MHz crystal, written in Bare Metal C. The player has to communicate with the AVR, using the commands described atthe command set, facing an AI which uses a simplified version of the minimax algorithm with depth 1",
      technologies: ["Bare Metal C", "AVR", "Embedded Systems", "Game"],
      link: "https://github.com/gflengas/AtMega16-Othello-game-implementation"
    },
    {
      title: "CPU based on Tomasulo Algorithm",
      description: "Project developed for Advanced Computer Architecture course. We were tasked to create and implement a processor with a dynamic pipeline based on the Tomasulo algorithm using VHDL.",
      technologies: ["VHDL", "FPGA", "Computer Architecture"],
      link: "https://github.com/gflengas/CPU-based-on-Tomasulo-algorithm"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-8">
        <TabsList className="grid w-full grid-cols-3 bg-gray-800">
          <TabsTrigger 
            value="about" 
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            About Me
          </TabsTrigger>
          <TabsTrigger 
            value="ai-ml" 
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            AI/ML Projects
          </TabsTrigger>
          <TabsTrigger 
            value="hardware" 
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            Hardware Projects
          </TabsTrigger>
        </TabsList>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={fadeIn}
          >
            {activeTab === "about" && (
              <TabsContent value="about" forceMount>
                <motion.div className="space-y-8 bg-gray-800 p-6 rounded-lg shadow-lg" variants={slideIn}>
                  <div className="flex flex-col md:flex-row gap-6 items-center md:items-start w-full">
                    <Image
                    src="/images/headshot.jpeg"
                    alt="George Flengas"
                    width={300}
                    height={300}
                    className="w-64 h-64 object-cover rounded-full"
                  />
                    <div className="flex flex-col justify-center w-full">
                      <div className="flex items-center justify-between mb-2">
                        <h2 className="text-3xl font-bold text-blue-400">George Flengas</h2>
                        <div className="flex gap-2">
                          <Link href="https://www.linkedin.com/in/georgios-flengas/" target="_blank" rel="noopener noreferrer">
                            <Linkedin className="w-6 h-6 text-blue-400 hover:text-blue-300" />
                            <span className="sr-only">LinkedIn</span>
                          </Link>
                          <Link href="https://medium.com/@g.flengas" target="_blank" rel="noopener noreferrer">
                            <MediumLogo className="w-6 h-6 text-blue-400 hover:text-blue-300" />
                            <span className="sr-only">Medium</span>
                          </Link>
                          <Link href="https://github.com/gflengas" target="_blank" rel="noopener noreferrer">
                            <Github className="w-6 h-6 text-blue-400 hover:text-blue-300" />
                            <span className="sr-only">GitHub</span>
                          </Link>
                          <Link href="https://x.com/flg_tech" target="_blank" rel="noopener noreferrer">
                            <XLogo className="w-6 h-6 text-blue-400 hover:text-blue-300" />
                            <span className="sr-only">XLogo</span>
                          </Link>
                        </div>
                      </div>
                      <p className="text-xl text-gray-300 mb-4"> Embedded Software Engineer & AI/ML Enthusiast</p>
                      <p className="text-gray-400">
                        Hello! I'm George Flengas, a passionate Embedded Systems Engineer with expertise in AI/ML 
                        and hardware development. I love exploring the intersection of software and hardware to 
                        create innovative solutions, from optimizing IoT devices to training custom LLMs. With a 
                        strong background in embedded systems and machine learning, I'm constantly pushing 
                        boundaries - whether it's accelerating neural networks on FPGAs or developing intelligent 
                        IoT solutions. I thrive on learning new technologies and using them to create impactful 
                        solutions that make a difference.
                      </p>
                    </div>
                  </div>

                  <Separator className="bg-blue-400/20" />

                  <motion.div variants={slideIn}>
                    <h2 className="text-2xl font-bold text-blue-400 mb-4">Education</h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-200">MEng in Electrical and Computer Engineering</h3>
                        <p className="text-gray-400">Technical University of Crete, Chania, 2014-2021</p>
                      </div>
                    </div>
                  </motion.div>

                  <Separator className="bg-blue-400/20" />

                  <motion.div variants={slideIn}>
                    <h2 className="text-2xl font-bold text-blue-400 mb-4">Work Experience</h2>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-200">Embedded Software Engineer</h3>
                        <p className="text-gray-400">Cicicom Ltd, 7/2022-11/2023</p>
                        <ul className="list-disc list-inside text-gray-400 mt-2">
                          <li>Integrated radar into Gen 2 parking spot sensor, improving accuracy from 91% to nearly 100% and optimizing battery life; comparison with Bosch and Fleximodo equivalents demonstrated higher accuracy.</li>
                          <li>Utilized STM32 MCU ecosystem on a PCB with I2C, SPI, and UART communications, featuring BLE, electromagnetic, and LoRaWan / NBIOT communication modules.</li>
                          <li>Streamlined verification and setup firmware for parking sensor PCB, reducing process time from 5 to 1 minute, significantly saving factory production time and reducing associated costs.</li>
                          <li>Developed a GUI application for SSH communication with Raspberry Pi to automate PCB flashing and testing, accelerating the assembly line process.</li>
                          <li>Contributed to Gen 3 PCB development, adding new features and improving component selection.</li>
                          <li>Established DevOps pipelines with Jenkins and SonarCloud, enhancing workflow and code quality.</li>
                          <li>Developed a LoRaWAN data analytics tool using Pandas, NumPy, and Matplotlib, processing over 1 million payloads from 300+ sensors. This tool was instrumental in securing a major project by identifying critical issues and is now a cornerstone in the company’s monitoring process for all new projects, ensuring ongoing success and reliability.</li>
                          <li>Led testing for Gen 2 sensor, creating scripts for automated data processing and boosting productivity.</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-200">Research Assistant</h3>
                        <p className="text-gray-400">MHL, Technical University of Crete, 2/2021-8/2024</p>
                        <ul className="list-disc list-inside text-gray-400 mt-2">
                          <li>Accelerated Convolutional Neural Networks training using FPGAs(Zynq UltraScale+ MPSoC ZCU102). 
                            Developed a Tensorflow model, replicated it in C++, and integrated into Vitis HLS for Vivado IPs</li>
                          <li>Achieved 1.5x acceleration over CPU, outperforming GPUs (7.8x) and CPUs (16.55x), 
                            demonstrating significant improvements in machine learning inference on FPGAs. Paper submitted to IEEE.</li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>

                  <Separator className="bg-blue-400/20" />

                  <motion.div variants={slideIn}>
                    <h2 className="text-2xl font-bold text-blue-400 mb-4">Skills</h2>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-200 mb-2">Programming Languages</h3>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="bg-gray-700 text-blue-300 border-blue-300">C</Badge>
                          <Badge variant="outline" className="bg-gray-700 text-blue-300 border-blue-300">C++</Badge>
                          <Badge variant="outline" className="bg-gray-700 text-blue-300 border-blue-300">Python</Badge>
                          <Badge variant="outline" className="bg-gray-700 text-blue-300 border-blue-300">Java</Badge>
                          <Badge variant="outline" className="bg-gray-700 text-blue-300 border-blue-300">VHDL</Badge>
                          <Badge variant="outline" className="bg-gray-700 text-blue-300 border-blue-300">Assembly MIPS</Badge>
                          <Badge variant="outline" className="bg-gray-700 text-blue-300 border-blue-300">Matlab</Badge>
                          <Badge variant="outline" className="bg-gray-700 text-blue-300 border-blue-300">PostgreSQL</Badge>
                          <Badge variant="outline" className="bg-gray-700 text-blue-300 border-blue-300">MongoDB</Badge>

                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-200 mb-2">Software Skills</h3>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="bg-gray-700 text-blue-300 border-blue-300">Machine Learning</Badge>
                          <Badge variant="outline" className="bg-gray-700 text-blue-300 border-blue-300">Data Analysis</Badge>
                          <Badge variant="outline" className="bg-gray-700 text-blue-300 border-blue-300">UML</Badge>
                          <Badge variant="outline" className="bg-gray-700 text-blue-300 border-blue-300">Design Patterns</Badge>
                          <Badge variant="outline" className="bg-gray-700 text-blue-300 border-blue-300">Unit Testing (Google Test)</Badge>
                          <Badge variant="outline" className="bg-gray-700 text-blue-300 border-blue-300">Git</Badge>
                          <Badge variant="outline" className="bg-gray-700 text-blue-300 border-blue-300">TensorFlow</Badge>
                          <Badge variant="outline" className="bg-gray-700 text-blue-300 border-blue-300">PyTorch</Badge>
                          <Badge variant="outline" className="bg-gray-700 text-blue-300 border-blue-300">GUI Development (Tkinter)</Badge>
                          <Badge variant="outline" className="bg-gray-700 text-blue-300 border-blue-300">Pandas</Badge>
                          <Badge variant="outline" className="bg-gray-700 text-blue-300 border-blue-300">NumPy</Badge>
                          <Badge variant="outline" className="bg-gray-700 text-blue-300 border-blue-300">Matplotlib</Badge>
                          <Badge variant="outline" className="bg-gray-700 text-blue-300 border-blue-300">Flask</Badge>
                          <Badge variant="outline" className="bg-gray-700 text-blue-300 border-blue-300">CMake</Badge>
                          <Badge variant="outline" className="bg-gray-700 text-blue-300 border-blue-300">Makefile</Badge>
                          <Badge variant="outline" className="bg-gray-700 text-blue-300 border-blue-300">GDB</Badge>
                          <Badge variant="outline" className="bg-gray-700 text-blue-300 border-blue-300">Valgrind</Badge>
                          <Badge variant="outline" className="bg-gray-700 text-blue-300 border-blue-300">MQTT</Badge>
                          <Badge variant="outline" className="bg-gray-700 text-blue-300 border-blue-300">TCP/IP Stack</Badge>
                          <Badge variant="outline" className="bg-gray-700 text-blue-300 border-blue-300">SSH</Badge>
                          <Badge variant="outline" className="bg-gray-700 text-blue-300 border-blue-300">CI/CD (Jenkins)</Badge>
                          <Badge variant="outline" className="bg-gray-700 text-blue-300 border-blue-300">SonarCloud</Badge>
                          <Badge variant="outline" className="bg-gray-700 text-blue-300 border-blue-300">Agile</Badge>
                          <Badge variant="outline" className="bg-gray-700 text-blue-300 border-blue-300">Jira</Badge>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-200 mb-2">Hardware Skills</h3>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="bg-gray-700 text-blue-300 border-blue-300">Embedded Systems</Badge>
                          <Badge variant="outline" className="bg-gray-700 text-blue-300 border-blue-300">Xilinx FPGA</Badge>
                          <Badge variant="outline" className="bg-gray-700 text-blue-300 border-blue-300">Microcontrollers</Badge>
                          <Badge variant="outline" className="bg-gray-700 text-blue-300 border-blue-300">STM32</Badge>
                          <Badge variant="outline" className="bg-gray-700 text-blue-300 border-blue-300">ESP32</Badge>
                          <Badge variant="outline" className="bg-gray-700 text-blue-300 border-blue-300">AVR</Badge>
                          <Badge variant="outline" className="bg-gray-700 text-blue-300 border-blue-300">Linux</Badge>
                          <Badge variant="outline" className="bg-gray-700 text-blue-300 border-blue-300">Raspberry Pi</Badge>
                          <Badge variant="outline" className="bg-gray-700 text-blue-300 border-blue-300">Orange Pi (Rockchip CPU)</Badge>
                          <Badge variant="outline" className="bg-gray-700 text-blue-300 border-blue-300">I2C</Badge>
                          <Badge variant="outline" className="bg-gray-700 text-blue-300 border-blue-300">SPI</Badge>
                          <Badge variant="outline" className="bg-gray-700 text-blue-300 border-blue-300">UART</Badge>
                          <Badge variant="outline" className="bg-gray-700 text-blue-300 border-blue-300">Bluetooth Low Energy</Badge>
                          <Badge variant="outline" className="bg-gray-700 text-blue-300 border-blue-300">WiFi</Badge>
                          <Badge variant="outline" className="bg-gray-700 text-blue-300 border-blue-300">LoRaWan</Badge>
                          <Badge variant="outline" className="bg-gray-700 text-blue-300 border-blue-300">NBIOT</Badge>
                          <Badge variant="outline" className="bg-gray-700 text-blue-300 border-blue-300">Circuit Design</Badge>
                          <Badge variant="outline" className="bg-gray-700 text-blue-300 border-blue-300">Altium</Badge>
                          <Badge variant="outline" className="bg-gray-700 text-blue-300 border-blue-300">Digital Signal Processing</Badge>
                          <Badge variant="outline" className="bg-gray-700 text-blue-300 border-blue-300">Power Management Design</Badge>
                          <Badge variant="outline" className="bg-gray-700 text-blue-300 border-blue-300">Oscilloscopes</Badge>
                          <Badge variant="outline" className="bg-gray-700 text-blue-300 border-blue-300">Logic Analyzers</Badge>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-200 mb-2">Languages</h3>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="bg-gray-700 text-blue-300 border-blue-300">English - C2</Badge>
                          <Badge variant="outline" className="bg-gray-700 text-blue-300 border-blue-300">German - B1</Badge>
                          <Badge variant="outline" className="bg-gray-700 text-blue-300 border-blue-300">Greek - Native</Badge>
                        </div>
                      </div>

                    </div>
                  </motion.div>

                  <Separator className="bg-blue-400/20" />

                  <motion.div variants={slideIn}>
                    <h2 className="text-2xl font-bold text-blue-400 mb-4">Contact Me</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input 
                          name="name"
                          type="text" 
                          placeholder="Name" 
                          className="bg-gray-700 text-blue-300 placeholder-gray-500 border-gray-600 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 focus:outline-none" 
                          required 
                          disabled={isSubmitting}
                        />
                        <Input 
                          name="email"
                          type="email" 
                          placeholder="Email" 
                          className="bg-gray-700 text-blue-300 placeholder-gray-500 border-gray-600 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 focus:outline-none" 
                          required 
                          disabled={isSubmitting}
                        />
                      </div>
                      <Input 
                        name="subject"
                        type="text" 
                        placeholder="Subject" 
                        className="bg-gray-700 text-blue-300 placeholder-gray-500 border-gray-600 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 focus:outline-none" 
                        required 
                        disabled={isSubmitting}
                      />
                      <Textarea 
                        name="message"
                        placeholder="Message" 
                        className="bg-gray-700 text-blue-300 placeholder-gray-500 border-gray-600 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 focus:outline-none" 
                        rows={4} 
                        required 
                        disabled={isSubmitting}
                      />
                      <Button 
                        type="submit" 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </Button>
                    </form>
                  </motion.div>
                </motion.div>
              </TabsContent>
            )}
            {activeTab === "ai-ml" && (
              <TabsContent value="ai-ml" forceMount>
                <motion.div className="bg-gray-800 p-6 rounded-lg shadow-lg" variants={slideIn}>
                  <h2 className="text-2xl font-bold text-blue-400 mb-6">AI/ML Projects</h2>
                  <div className="space-y-6">
                    {aiMlProjects.map((project, index) => (
                      <motion.div key={index} variants={slideIn} custom={index}>
                        
                        <Card className="bg-gray-700 border-gray-600">
                          <CardHeader>
                            <CardTitle className="text-blue-300">{project.title}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <CardDescription className="text-gray-300">{project.description}</CardDescription>
                          </CardContent>
                          <CardFooter className="flex flex-col items-start gap-4">
                            <div className="flex flex-wrap gap-2">
                              {project.technologies.map((tech, techIndex) => (
                                <Badge key={techIndex} variant="outline" className="text-blue-300 border-blue-300">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                            <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                              <Link href={project.link} target="_blank" rel="noopener noreferrer">
                                Learn More
                              </Link>
                            </Button>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>
            )}
            {activeTab === "hardware" && (
              <TabsContent value="hardware" forceMount>
                <motion.div className="bg-gray-800 p-6 rounded-lg shadow-lg" variants={slideIn}>
                  <h2 className="text-2xl font-bold text-blue-400 mb-6">Hardware Projects</h2>
                  <div className="space-y-6">
                    {hardwareProjects.map((project, index) => (
                      <motion.div key={index} variants={slideIn} custom={index}>
                        <Card className="bg-gray-700 border-gray-600">
                          <CardHeader>
                            <CardTitle className="text-blue-300">{project.title}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <CardDescription className="text-gray-300">{project.description}</CardDescription>
                          </CardContent>
                          <CardFooter className="flex flex-col items-start gap-4">
                            <div className="flex flex-wrap gap-2">
                              {project.technologies.map((tech, techIndex) => (
                                <Badge key={techIndex} variant="outline" className="text-blue-300 border-blue-300">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                            <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                              <Link href={project.link} target="_blank" rel="noopener noreferrer">
                                Learn More
                              </Link>
                            </Button>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>
            )}
          </motion.div>
        </AnimatePresence>
      </Tabs>
    </div>
  )
}
