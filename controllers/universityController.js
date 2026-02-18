// controllers/universityController.js
import University from '../models/University.js';

// Submit university association form
export const submitUniversityForm = async (req, res) => {
  try {
    const {
      // Section 1
      officialName,
      universityType,
      yearOfEstablishment,
      location,
      recognitionStatus,
      
      // Section 2
      hasPhdProgram,
      phdDisciplines,
      otherDiscipline,
      phdModes,
      otherMode,
      averageScholars,
      
      // Section 3
      phdGuideCount,
      supportSystems,
      timelineTracking,
      
      // Section 4
      phdChallenges,
      completionImportance,
      
      // Section 5
      onboardingMethods,
      profileAdmissionPreference,
      preferredScholarTypes,
      
      // Section 6
      interests,
      supportPreferences,
      institutionPhilosophy,
      
      // Section 7
      contactPerson,
      
      // Declaration
      declarationConfirmed
    } = req.body;

    // Validation
    if (!declarationConfirmed) {
      return res.status(400).json({
        success: false,
        message: 'Please confirm the declaration'
      });
    }

    if (!officialName || !universityType || !contactPerson?.name || !contactPerson?.email) {
      return res.status(400).json({
        success: false,
        message: 'Required fields are missing'
      });
    }

    // Create new university submission
    const university = new University({
      officialName,
      universityType,
      yearOfEstablishment: parseInt(yearOfEstablishment),
      location,
      recognitionStatus,
      hasPhdProgram,
      phdDisciplines,
      otherDiscipline,
      phdModes,
      otherMode,
      averageScholars,
      phdGuideCount,
      supportSystems,
      timelineTracking,
      phdChallenges,
      completionImportance,
      onboardingMethods,
      profileAdmissionPreference,
      preferredScholarTypes,
      interests,
      supportPreferences,
      institutionPhilosophy,
      contactPerson,
      declarationConfirmed
    });

    await university.save();

    res.status(201).json({
      success: true,
      message: 'University association form submitted successfully!',
      data: {
        id: university._id,
        submissionDate: university.submissionDate,
        referenceId: `SS-UNI-${university._id.toString().slice(-8).toUpperCase()}`
      }
    });

  } catch (error) {
    console.error('Error submitting university form:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting form. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get all university submissions (admin only)
export const getAllSubmissions = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    
    const query = {};
    if (status) query.status = status;
    
    const submissions = await University.find(query)
      .sort({ submissionDate: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .select('-__v');
    
    const total = await University.countDocuments(query);
    
    res.status(200).json({
      success: true,
      data: submissions,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching submissions'
    });
  }
};

// Get single submission by ID
export const getSubmissionById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const submission = await University.findById(id).select('-__v');
    
    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: submission
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching submission'
    });
  }
};

// Update submission status (admin only)
export const updateSubmissionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;
    
    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required'
      });
    }
    
    const submission = await University.findByIdAndUpdate(
      id,
      { 
        status,
        ...(notes && { notes })
      },
      { new: true, runValidators: true }
    ).select('-__v');
    
    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Status updated successfully',
      data: submission
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating status'
    });
  }
};