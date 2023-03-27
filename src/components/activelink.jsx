import { useRouter } from 'next/router'


function ActiveLink({ children, href, className }) {
  const router = useRouter()
  let new_className = className;

  const handleClick = (e) => {
    e.preventDefault()
    router.push(href)
  }

  if (router.asPath === href) {
    new_className = `${className} active`;
  }

  return (
    <a href={href} className={new_className} onClick={handleClick}>
      {children}
    </a>
  )
}

export default ActiveLink
