import React from 'react'
import '../index.css'
const About = () => {
  return (
    <div>
      <div className='container-fluid tw-bg-lightGrey'>
        <h1>About Us</h1>
        <div className=''>
          <div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean consequat
              tortor fermentum mi fermentum dignissim. Nullam vel ipsum ut ligula elementum
              lobortis. Maecenas aliquam, massa laoreet lacinia pretium, nisi urna venenatis
              tortor, nec imperdiet tellus libero efficitur metus. Fusce semper posuere
              ligula, et facilisis metus bibendum interdum. Mauris at mauris sit amet sem
              pharetra commodo a eu leo. Nam at est non risus cursus maximus. Nam feugiat
              augue libero, id consectetur tortor bibendum non. Quisque nec fringilla lorem.
              Nullam efficitur vulputate mauris, nec maximus leo dignissim id.
            </p>
            <p>
              In hac habitasse platea dictumst. Duis sagittis dui ac ex suscipit maximus.
              Morbi pellentesque venenatis felis sed convallis. Nulla varius, nibh vitae
              placerat tempus, mauris sem elementum ipsum, eget sollicitudin nisl est vel
              purus. Fusce malesuada odio velit, non cursus leo fermentum id. Cras pharetra
              sodales fringilla. Etiam quis est a dolor egestas pellentesque. Maecenas non
              scelerisque purus, congue cursus arcu. Donec vel dapibus mi. Mauris maximus
              posuere placerat. Sed et libero eu nibh tristique mollis a eget lectus. Donec
              interdum augue sollicitudin vehicula hendrerit. Vivamus justo orci, molestie
              ac sollicitudin ac, lobortis at tellus. Etiam rhoncus ullamcorper risus eu
              tempor. Sed porttitor, neque ac efficitur gravida, arcu lacus pharetra dui, in
              consequat elit tellus auctor nulla. Donec placerat elementum diam, vitae
              imperdiet lectus luctus at.
            </p>
            <p>
              Nullam eu feugiat mi. Quisque nec tristique nisl, dignissim dictum leo. Nam
              non quam nisi. Donec rutrum turpis ac diam blandit, id pulvinar mauris
              suscipit. Pellentesque tincidunt libero ultricies risus iaculis, sit amet
              consequat velit blandit. Fusce quis varius nulla. Nullam nisi nisi, suscipit
              ut magna quis, feugiat porta nibh. Sed id enim lectus. Suspendisse elementum
              justo sapien, sit amet consequat orci accumsan et. Aliquam ornare ullamcorper
              sem sed finibus. Nullam ac lacus pulvinar, egestas felis ut, accumsan est.
            </p>
            <p>
              Pellentesque sagittis vehicula sem quis luctus. Proin sodales magna in lorem
              hendrerit aliquam. Integer eu varius orci. Vestibulum ante ipsum primis in
              faucibus orci luctus et ultrices posuere cubilia Curae; Vestibulum ante ipsum
              primis in faucibus orci luctus et ultrices posuere cubilia Curae; Ut at mauris
              nibh. Suspendisse maximus ac eros at vestibulum.
            </p>
          </div>
          <div className='p-4 row justify-content-around'>
            <div className='col col-md-5' >
              <h4 className='text-center'>Our Location</h4>
              <iframe className='text-center' title='Our Location' src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d55097.91283227362!2d78.02716159999999!3d30.333337599999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1704449867793!5m2!1sen!2sin" width={350} height={300} style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
            <div className='col col-md-5'>
              <h4 className='text-center'>Contact Us</h4>
              <div className='card p-4'>
                <h5>Phone Number: +918976453627</h5>
                <h5>Phone Number: +919224424627</h5>
                <h5>Office Address: Mumbai, India</h5>
                <h5>Office Address: Gujrat, India</h5>
                <h5>Office Address: Pune, India</h5>
                <h5>Office Address: Dehradun, India</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
