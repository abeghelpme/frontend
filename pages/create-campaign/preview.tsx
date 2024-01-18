function Preview() {
  // const { stepOneData, stepTwoData, stepThreeData } = useFormStore(
  //   (state) => state,
  // );

  return (
    <main
      className="bg-contours bg-cover px-[2.4rem] pt-[3.2rem]"
      data-rem-reset
    >
      <header className="flex flex-col gap-[0.8rem]">
        <h1 className="font-semibold text-formBtn">Campaign Preview</h1>

        <p className="text-[1.4rem] text-formBtn">
          This is what your fundraiser campaign will look like to donors
        </p>
      </header>

      <section>
        <h2></h2>
      </section>
    </main>
  );
}
export default Preview;
