import '@/app/globals.scss';

// export const metadata = { title: '영화', description: '영화 A sample Next.js app' };

export default function Layout(props: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      
      {props.children}
      {props.modal}
      <div id="modal-root" className='fixed z-[9999]' />
    </>
  );
}