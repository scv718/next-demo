import Image from 'next/image';

import ContactForm from '@/components/form/ContactForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { ArrowRight, Cloud, Code, Palette } from 'lucide-react';

export default function HomePage() {
  const services = [
    {
      icon: <Code className='h-12 w-12 text-primary' />,
      title: 'Web App Development',
      description: '최신 기술과 최적의 개발 방식으로 구축된 맞춤형 웹 애플리케이션을 제공'
    },
    {
      icon: <Palette className='h-12 w-12 text-primary' />,
      title: 'UI/UX Design',
      description: '사용자의 감성을 사로잡고 몰입도를 높이는 세련되고 직관적인 디자인을 제공'
    },
    {
      icon: <Cloud className='h-12 w-12 text-primary' />,
      title: 'Cloud Solutions',
      description: '최신 애플리케이션을 위한 확장 가능한 클라우드 인프라 및 배포 솔루션을 제공'
    }
  ];

  const placeholder = '/assets/images/placeholder/placeholder.svg?height=300&width=400';
  const portfolioItems = [
    { id: 1, title: '쇼핑몰', image: placeholder },
    { id: 2, title: '대시보드', image: placeholder },
    { id: 3, title: '앱', image: placeholder },
    { id: 4, title: '포털', image: placeholder }
  ];

  return (
    // 기본 배경과 텍스트 색상을 설정합니다.
    <div className='min-h-screen bg-background text-foreground'>
      {/* Hero Section */}
      {/* 그라데이션은 유니크하므로 직접 유틸리티 클래스를 사용할 수 있습니다. */}
      <section className='relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-sky-100 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900'>
        <div className='max-w-7xl mx-auto text-center'>
          <h1 className='text-4xl md:text-6xl font-bold text-primary mb-6'>압도적 디지털 경험.</h1>
          <p className='text-xl text-primary mb-8 max-w-3xl mx-auto'>
            코드용병단은 혁신적인 디지털 솔루션을 통해 기업의 성장을 부추기는 웹 개발 전문 에이전시
            <br />
            창의적인 솔루션은 코드용병단!
          </p>
          <Button size='lg' className='bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg'>
            Get a Free Quote
            <ArrowRight className='ml-2 h-5 w-5' />
          </Button>
        </div>
      </section>

      {/* Services Section */}
      <section className='py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold mb-4'>제공 서비스</h2>
            <p className='text-muted-foreground text-lg max-w-2xl mx-auto'>
              온라인 성공을 위한 종합적인 디지털 솔루션을 제공
            </p>
          </div>
          <div className='grid md:grid-cols-3 gap-8'>
            {services.map((service, index) => (
              <Card
                key={index}
                className='bg-card text-card-foreground border-border hover:border-primary transition-colors duration-300'>
                <CardHeader className='text-center'>
                  <div className='flex justify-center mb-4'>{service.icon}</div>
                  <CardTitle className='text-xl'>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className='py-20 px-4 sm:px-6 lg:px-8 bg-muted/40'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold mb-4'>주요 프로젝트</h2>
            <p className='text-muted-foreground text-lg max-w-2xl mx-auto'>
              비즈니스의 온라인 존재감을 어떻게 변화시켰는지, 우리의 작업을 직접 확인해보세요.
            </p>
          </div>
          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {portfolioItems.map((item) => (
              <Card
                key={item.id}
                className='bg-card border-border hover:border-primary transition-all duration-300 cursor-pointer group'>
                <CardContent className='p-0'>
                  <div className='relative overflow-hidden rounded-t-lg'>
                    <Image
                      src={item.image || '/placeholder.svg'}
                      alt={item.title}
                      width={400}
                      height={300}
                      className='w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300'
                    />
                  </div>
                  <div className='p-4'>
                    <h3 className='text-card-foreground font-semibold text-lg'>{item.title}</h3>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className='py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-4xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold mb-4'>문의 하기</h2>
            <p className='text-muted-foreground text-lg max-w-2xl mx-auto'>
              다음 프로젝트를 시작할 준비가 되셨나요? 메시지를 보내주시면 24시간 이내에 답변드리겠습니다.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
