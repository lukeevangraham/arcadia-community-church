import SEO from "../../components/SEO/SEO";
import Link from "next/link";
import Layout from "../../components/Layout/Layout";
import { fetchAPI } from "../../lib/api";

import classes from "./index.module.scss";

export async function getStaticProps() {
  const [globalData, jobsData] = await Promise.all([
    fetchAPI("/global?populate=deep"),
    fetchAPI("/job-openings?populate=deep"),
  ]);
  return {
    props: { globalData, jobsData },
    revalidate: 1,
  };
}

const Jobs = ({ globalData, jobsData }) => (
  <>
    <SEO
      metaData={{
        metaTitle: `Job Opportunities`,
        metaDescription: `Current job opportunities in Journey Community Church, Arcadia, California`,
      }}
    />
    <Layout globalData={globalData}>
      <section className="u-section-heading">
        <div className="row">
          <h1>Job Openings</h1>
          <h4>
            &quot;Whatever you do, work at it with all your heart, as working
            for the Lord, not for human masters&quot; Colossians 3:23
          </h4>
        </div>
      </section>
      <section className="row">
        <div className={classes.Jobs}>
          {jobsData.data.length > 0 ? (
            jobsData.data.map((job) => (
              <div key={job.id}>
                <Link href={`/jobs/${job.attributes.slug}`}>
                  <a>
                    <p>{job.attributes.jobTitle}</p>
                  </a>
                </Link>
              </div>
            ))
          ) : (
            <p>There are currently no job opportunities available.</p>
          )}
        </div>
      </section>
    </Layout>
  </>
);

export default Jobs;
