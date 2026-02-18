import EntranceExam from "../models/CommonEntrance.js";
import fs from "fs";


// ================= APPLY =================

export const applyEntranceExam = async (req, res) => {

  try {

    if (!req.body.applicationData)
      return res.status(400).json({
        success: false,
        message: "Application data missing"
      });


    const applicationData =
      JSON.parse(req.body.applicationData);


    const files = req.files || {};


    const documents = {

      idProofDocument:
        files.idProofDocument?.[0]?.filename || null,

      tenthMarksheet:
        files.tenthMarksheet?.[0]?.filename || null,

      twelfthMarksheet:
        files.twelfthMarksheet?.[0]?.filename || null,

      graduationDegree:
        files.graduationDegree?.[0]?.filename || null,

      pgDegree:
        files.pgDegree?.[0]?.filename || null,

      cvResume:
        files.cvResume?.[0]?.filename || null,

      passportPhoto:
        files.passportPhoto?.[0]?.filename || null

    };


    const newApplication =
      new EntranceExam({
        applicationData,
        documents
      });


    await newApplication.save();


    res.status(201).json({
      success: true,
      message:
        "Entrance Exam Application Submitted Successfully",
      data: newApplication
    });

  }
  catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



// ================= GET ALL =================

export const getAllEntranceExams =
  async (req, res) => {

    try {

      const data =
        await EntranceExam.find()
          .sort({ createdAt: -1 });

      res.json({
        success: true,
        count: data.length,
        data
      });

    }
    catch (error) {

      res.status(500).json({
        success: false,
        message: error.message
      });

    }

  };



// ================= GET SINGLE =================

export const getEntranceExamById =
  async (req, res) => {

    try {

      const data =
        await EntranceExam.findById(req.params.id);

      if (!data)
        return res.status(404).json({
          success: false,
          message: "Not found"
        });

      res.json({
        success: true,
        data
      });

    }
    catch (error) {

      res.status(500).json({
        success: false,
        message: error.message
      });

    }

  };



// ================= DELETE =================

export const deleteEntranceExam =
  async (req, res) => {

    try {

      const data =
        await EntranceExam.findById(req.params.id);

      if (!data)
        return res.status(404).json({
          success: false
        });


      // delete files

      Object.values(data.documents)
        .forEach(file => {

          if (file &&
            fs.existsSync(
              "./uploads/" + file))
            fs.unlinkSync(
              "./uploads/" + file);

        });


      await data.deleteOne();


      res.json({
        success: true,
        message: "Deleted successfully"
      });

    }
    catch (error) {

      res.status(500).json({
        success: false,
        message: error.message
      });

    }

  };
