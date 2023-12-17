import Link from 'next/link'

function MenuItem(args) {
    return <li className={styles.menuitems}>
      <Link className={styles.link} href={args.link ? args.link : "/"}>  {args.title}  </Link>
    </li>
  }